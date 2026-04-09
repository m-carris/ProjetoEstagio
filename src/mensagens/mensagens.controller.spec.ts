// ====================================================
// mensagens.controller.spec.ts — Testes do controller de mensagens
// ====================================================

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MensagensController } from './mensagens.controller';
import { MensagensService } from './mensagens.service';
import { Mensagem } from './entities/mensagem.entity';
import { NotificacoesGateway } from '../notificacoes/notificacoes.gateway';
import { JwtService } from '@nestjs/jwt';

describe('MensagensController', () => {
  let controller: MensagensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MensagensController],
      providers: [
        MensagensService,
        {
          provide: getRepositoryToken(Mensagem),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: NotificacoesGateway,
          useValue: {
            enviarParaTodos: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MensagensController>(MensagensController);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });
});
