// ====================================================
// auth.controller.ts — Controller de autenticação
// Recebe os pedidos HTTP de login e registo.
// ====================================================

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistarDto } from './dto/registar.dto';
import { LoginDto } from './dto/login.dto';

// @Controller('api/auth') = este controller responde em /api/auth
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /api/auth/registar — regista um novo utilizador
  @Post('registar')
  registar(@Body() dados: RegistarDto) {
    return this.authService.registar(dados);
  }

  // POST /api/auth/login — faz login e devolve um token
  @Post('login')
  login(@Body() dados: LoginDto) {
    return this.authService.login(dados);
  }
}
