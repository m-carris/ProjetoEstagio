// ====================================================
// auth.service.ts — Serviço de autenticação
// Contém a lógica para registar utilizadores e fazer login.
// ====================================================

import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Utilizador } from './entities/utilizador.entity';
import { RegistarDto } from './dto/registar.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    // Repositório para aceder à tabela de utilizadores
    @InjectRepository(Utilizador)
    private readonly utilizadorRepo: Repository<Utilizador>,

    // Serviço do NestJS para criar tokens JWT
    private readonly jwtService: JwtService,
  ) {}

  // ---- REGISTAR UM NOVO UTILIZADOR ----
  async registar(dados: RegistarDto) {
    // 1. Verifica se já existe um utilizador com este email
    const existe = await this.utilizadorRepo.findOneBy({
      email: dados.email,
    });

    if (existe) {
      // ConflictException devolve erro 409 (conflito)
      throw new ConflictException('Já existe um utilizador com este email');
    }

    // 2. Encripta a password (NUNCA guardar passwords em texto simples!)
    //    O "10" é o número de rondas de encriptação (quanto maior, mais seguro mas mais lento)
    const passwordEncriptada = await bcrypt.hash(dados.password, 10);

    // 3. Cria o utilizador na base de dados com a password encriptada
    const novoUtilizador = this.utilizadorRepo.create({
      nome: dados.nome,
      email: dados.email,
      password: passwordEncriptada,
      tipo: dados.tipo,
    });

    const guardado = await this.utilizadorRepo.save(novoUtilizador);

    // 4. Devolve os dados do utilizador SEM a password (por segurança)
    return {
      id: guardado.id,
      nome: guardado.nome,
      email: guardado.email,
      tipo: guardado.tipo,
    };
  }

  // ---- FAZER LOGIN ----
  async login(dados: LoginDto) {
    // 1. Procura o utilizador pelo email
    const utilizador = await this.utilizadorRepo.findOneBy({
      email: dados.email,
    });

    // Se não existe, devolve erro 401 (não autorizado)
    // Usamos a mesma mensagem genérica para não revelar se o email existe ou não
    if (!utilizador) {
      throw new UnauthorizedException('Email ou password incorretos');
    }

    // 2. Compara a password enviada com a password encriptada na base de dados
    const passwordCorreta = await bcrypt.compare(
      dados.password,
      utilizador.password,
    );

    if (!passwordCorreta) {
      throw new UnauthorizedException('Email ou password incorretos');
    }

    // 3. Cria um token JWT (é como um "passe" que prova que fez login)
    //    Colocamos dentro do token o id, email e tipo do utilizador
    const token = this.jwtService.sign({
      id: utilizador.id,
      email: utilizador.email,
      tipo: utilizador.tipo,
    });

    // 4. Devolve o token e os dados do utilizador (sem a password)
    return {
      token,
      utilizador: {
        id: utilizador.id,
        nome: utilizador.nome,
        email: utilizador.email,
        tipo: utilizador.tipo,
      },
    };
  }
}
