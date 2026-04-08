// ============================================
// CÓDIGO ORIGINAL — gerado por IA
// Comentado para o guião de aprendizagem
// Vais reescrever este ficheiro passo a passo!
// ============================================
/*
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MensagensService } from './mensagens.service';
import { Mensagem } from './entities/mensagem.entity';

describe('MensagensService', () => {
  let service: MensagensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MensagensService,
        // Mock do repositório (simula a base de dados nos testes)
        {
          provide: getRepositoryToken(Mensagem),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MensagensService>(MensagensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

*/
