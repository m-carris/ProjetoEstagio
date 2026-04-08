// ============================================
// CÓDIGO ORIGINAL — gerado por IA
// Comentado para o guião de aprendizagem
// Vais reescrever este ficheiro passo a passo!
// ============================================
/*
// ====================================================
// app.module.ts — Módulo principal da aplicação
// Um "módulo" no NestJS é como uma caixa que agrupa coisas relacionadas.
// Este é o módulo principal que junta tudo.
// ====================================================

import { Module } from '@nestjs/common';

// TypeOrmModule serve para ligar o NestJS à base de dados PostgreSQL
import { TypeOrmModule } from '@nestjs/typeorm';

// Importamos os ficheiros do módulo principal
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importamos os outros módulos (cada um trata de uma parte do sistema)
import { MensagensModule } from './mensagens/mensagens.module';

// @Module é um "decorador" — é uma etiqueta especial que diz ao NestJS:
// "Esta classe é um módulo, e aqui estão as suas configurações"
@Module({
  imports: [
    // Configuração da ligação à base de dados PostgreSQL
    // Estes dados têm de corresponder ao que está no docker-compose.yml
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'notificacoes_db',
      // autoLoadEntities faz o TypeORM encontrar as tabelas automaticamente
      autoLoadEntities: true,
      // synchronize cria/atualiza as tabelas automaticamente
      // ATENÇÃO: só usar em desenvolvimento, nunca em produção!
      synchronize: true,
    }),

    // Módulo que trata das mensagens (criar, listar, etc.)
    MensagensModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

*/
