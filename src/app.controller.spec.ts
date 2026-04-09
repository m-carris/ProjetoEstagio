// ====================================================
// app.controller.spec.ts — Testes do controller principal
// ====================================================

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('deve devolver a mensagem de boas-vindas', () => {
      expect(appController.getHello()).toBe(
        'Backend do Sistema de Notificações está a funcionar!',
      );
    });
  });
});
