// ====================================================
// auth.module.ts — Módulo de autenticação
// Agrupa tudo o que tem a ver com login e registo.
// ====================================================

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Utilizador } from './entities/utilizador.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    // Regista a entidade Utilizador para poder aceder à tabela
    TypeOrmModule.forFeature([Utilizador]),

    // Configuração do JWT (sistema de tokens para autenticação)
    JwtModule.register({
      // A chave secreta usada para assinar os tokens
      // NOTA: em produção, isto deve vir de uma variável de ambiente (.env)
      secret: 'chave-secreta-notificacoes-cct',
      signOptions: {
        // O token expira ao fim de 24 horas (o utilizador tem de fazer login outra vez)
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
