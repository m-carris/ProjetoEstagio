// ====================================================
// app.module.ts — Módulo principal (completo)
// ====================================================

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MensagensModule } from './mensagens/mensagens.module';
import { AuthModule } from './auth/auth.module';
import { NotificacoesModule } from './notificacoes/notificacoes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'notificacoes_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MensagensModule,
    AuthModule,
    NotificacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
