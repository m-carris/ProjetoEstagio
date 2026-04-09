// ====================================================
// mensagens.service.spec.ts — Testes do serviço de mensagens
// ====================================================

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MensagensService } from './mensagens.service';
import { Mensagem } from './entities/mensagem.entity';
import { NotificacoesGateway } from '../notificacoes/notificacoes.gateway';

describe('MensagensService', () => {
  let service: MensagensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      ],
    }).compile();

    service = module.get<MensagensService>(MensagensService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });
});
