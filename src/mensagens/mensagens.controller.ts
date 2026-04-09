// ====================================================
// mensagens.controller.ts — Controller (com autenticação)
// ====================================================

import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { MensagensService } from './mensagens.service';
import { CreateMensagemDto } from './dto/create-mensagem.dto';
import { Mensagem } from './entities/mensagem.entity';
import { AuthGuard } from '../auth/auth.guard';
import { TEMPLATES } from './templates';

@Controller('api/mensagens')
export class MensagensController {
  constructor(private readonly mensagensService: MensagensService) {}

  // GET /api/mensagens/templates — devolve os templates disponíveis
  @Get('templates')
  getTemplates() {
    return TEMPLATES;
  }

  // GET /api/mensagens/pesquisa?texto=acidente&prioridade=alta
  @Get('pesquisa')
  pesquisar(
    @Query('texto') texto?: string,
    @Query('prioridade') prioridade?: 'normal' | 'alta',
  ) {
    return this.mensagensService.pesquisar(texto, prioridade);
  }

  // GET /api/mensagens — devolve TODAS as mensagens
  @Get()
  getAll(): Promise<Mensagem[]> {
    return this.mensagensService.getAll();
  }

  // GET /api/mensagens/:id — devolve a mensagem com id
  @Get(':id')
  getById(@Param('id') id: string): Promise<Mensagem | null> {
    return this.mensagensService.getById(Number(id));
  }

  // POST /api/mensagens — PROTEGIDO (precisa de token!)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dados: CreateMensagemDto): Promise<Mensagem> {
    return this.mensagensService.create(dados);
  }
}
