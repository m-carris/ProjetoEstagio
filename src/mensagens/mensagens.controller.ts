// ============================================
// CÓDIGO ORIGINAL — gerado por IA
// Comentado para o guião de aprendizagem
// Vais reescrever este ficheiro passo a passo!
// ============================================
/*
// ====================================================
// mensagens.controller.ts — Controller de mensagens
// Recebe os pedidos HTTP relacionados com mensagens
// e passa o trabalho para o MensagensService.
// ====================================================

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MensagensService } from './mensagens.service';
import { CreateMensagemDto } from './dto/create-mensagem.dto';

// @Controller('api/mensagens') = este controller responde em /api/mensagens
@Controller('api/mensagens')
export class MensagensController {
  // O NestJS injeta automaticamente o MensagensService aqui
  constructor(private readonly mensagensService: MensagensService) {}

  // GET /api/mensagens — devolve todas as mensagens
  @Get()
  getAll() {
    return this.mensagensService.getAll();
  }

  // GET /api/mensagens/5 — devolve a mensagem com id 5
  // @Param('id') captura o valor que vem no URL (o "5" neste caso)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.mensagensService.getById(Number(id));
  }

  // POST /api/mensagens — cria uma nova mensagem
  // @Body() captura os dados enviados no corpo do pedido (o JSON)
  @Post()
  create(@Body() dados: CreateMensagemDto) {
    return this.mensagensService.create(dados);
  }
}

*/
