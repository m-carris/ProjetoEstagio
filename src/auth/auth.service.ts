// ====================================================
// auth.service.ts — Serviço de autenticação
// ====================================================

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
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
    @InjectRepository(Utilizador)
    private readonly utilizadorRepo: Repository<Utilizador>,

    private readonly jwtService: JwtService,
  ) {}

  async registar(dados: RegistarDto): Promise<{ mensagem: string }> {
    const existente = await this.utilizadorRepo.findOneBy({
      email: dados.email,
    });

    if (existente) {
      throw new ConflictException('Já existe um utilizador com este email');
    }

    const passwordEncriptada = await bcrypt.hash(dados.password, 10);

    const novoUtilizador = this.utilizadorRepo.create({
      nome: dados.nome,
      email: dados.email,
      password: passwordEncriptada,
      tipo: dados.tipo,
    });

    await this.utilizadorRepo.save(novoUtilizador);

    return { mensagem: 'Utilizador registado com sucesso!' };
  }

  async login(dados: LoginDto): Promise<{ access_token: string }> {
    const utilizador = await this.utilizadorRepo.findOneBy({
      email: dados.email,
    });

    if (!utilizador) {
      throw new UnauthorizedException('Email ou password incorretos');
    }

    const passwordCorreta = await bcrypt.compare(
      dados.password,
      utilizador.password,
    );

    if (!passwordCorreta) {
      throw new UnauthorizedException('Email ou password incorretos');
    }

    const payload = {
      sub: utilizador.id,
      nome: utilizador.nome,
      email: utilizador.email,
      tipo: utilizador.tipo,
    };

    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
