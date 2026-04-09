// ====================================================
// mensagens.module.ts — Módulo de mensagens (com auth e WebSockets)
// ====================================================

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensagem } from './entities/mensagem.entity';
import { MensagensController } from './mensagens.controller';
import { MensagensService } from './mensagens.service';
import { AuthModule } from '../auth/auth.module';
import { NotificacoesModule } from '../notificacoes/notificacoes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mensagem]),
    AuthModule,
    NotificacoesModule,
  ],
  controllers: [MensagensController],
  providers: [MensagensService],
})
export class MensagensModule {}
