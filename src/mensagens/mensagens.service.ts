// ====================================================
// mensagens.service.ts — Serviço de mensagens
// Contém a lógica para criar e buscar mensagens na base de dados.
// ====================================================

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensagem } from './entities/mensagem.entity';
import { CreateMensagemDto } from './dto/create-mensagem.dto';

@Injectable()
export class MensagensService {
  // O TypeORM injeta aqui o "repositório" da tabela de mensagens
  // Um repositório é como um ajudante que sabe fazer operações na tabela
  // (inserir, buscar, apagar, etc.)
  constructor(
    @InjectRepository(Mensagem)
    private readonly mensagemRepo: Repository<Mensagem>,
  ) {}

  // Devolve todas as mensagens, ordenadas da mais recente para a mais antiga
  getAll() {
    return this.mensagemRepo.find({
      order: { dataCriacao: 'DESC' },
    });
  }

  // Devolve uma mensagem específica pelo seu id
  getById(id: number) {
    return this.mensagemRepo.findOneBy({ id });
  }

  // Cria uma nova mensagem e guarda na base de dados
  create(dados: CreateMensagemDto) {
    // mensagemRepo.create() prepara o objeto (mas ainda não guarda)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const novaMensagem = this.mensagemRepo.create(dados);

    // mensagemRepo.save() guarda efetivamente na base de dados
    return this.mensagemRepo.save(novaMensagem);
  }
}
