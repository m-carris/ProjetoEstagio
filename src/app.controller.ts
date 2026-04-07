// ====================================================
// app.controller.ts — Controller principal
// Um "controller" é o ficheiro que recebe os pedidos HTTP (GET, POST, etc.)
// e decide o que fazer com eles. É como um rececionista.
// ====================================================

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// @Controller() diz ao NestJS: "Esta classe recebe pedidos HTTP"
// Como não tem nada entre parênteses, responde no endereço raiz: /
@Controller()
export class AppController {
  // O NestJS "injeta" automaticamente o AppService aqui
  // É como dizer: "preciso do serviço, dá-mo automaticamente"
  constructor(private readonly appService: AppService) {}

  // @Get() significa: quando alguém faz GET http://localhost:3000/
  // executa esta função
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
