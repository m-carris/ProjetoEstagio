// ====================================================
// mensagens.module.ts — Módulo de mensagens
// Este módulo agrupa tudo o que tem a ver com mensagens:
// o controller, o service e a entidade (tabela) da base de dados.
// ====================================================

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensagem } from './entities/mensagem.entity';
import { MensagensController } from './mensagens.controller';
import { MensagensService } from './mensagens.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature() regista a entidade Mensagem neste módulo
    // Isto permite ao service aceder à tabela de mensagens na base de dados
    TypeOrmModule.forFeature([Mensagem]),
  ],
  controllers: [MensagensController],
  providers: [MensagensService],
})
export class MensagensModule {}
