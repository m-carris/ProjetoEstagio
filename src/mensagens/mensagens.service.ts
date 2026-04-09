// ====================================================
// mensagens.service.ts — Com notificações em tempo real
// ====================================================

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Mensagem } from './entities/mensagem.entity';
import { CreateMensagemDto } from './dto/create-mensagem.dto';
import { NotificacoesGateway } from '../notificacoes/notificacoes.gateway';

@Injectable()
export class MensagensService {
  constructor(
    @InjectRepository(Mensagem)
    private readonly mensagemRepo: Repository<Mensagem>,

    private readonly notificacoes: NotificacoesGateway,
  ) {}

  getAll(): Promise<Mensagem[]> {
    return this.mensagemRepo.find({
      order: { dataCriacao: 'DESC' },
    });
  }

  getById(id: number): Promise<Mensagem | null> {
    return this.mensagemRepo.findOneBy({ id });
  }

  async create(dados: CreateMensagemDto): Promise<Mensagem> {
    const novaMensagem = this.mensagemRepo.create(dados);
    const mensagemGuardada = await this.mensagemRepo.save(novaMensagem);

    // Enviar a mensagem a todos os clientes ligados via WebSocket
    this.notificacoes.enviarParaTodos(mensagemGuardada);

    return mensagemGuardada;
  }

  async pesquisar(texto?: string, prioridade?: 'normal' | 'alta'): Promise<Mensagem[]> {
    const where: any = {};

    if (texto) {
      where.texto = Like(`%${texto}%`);
    }

    if (prioridade) {
      where.prioridade = prioridade;
    }

    return this.mensagemRepo.find({
      where,
      order: { dataCriacao: 'DESC' },
    });
  }
}
