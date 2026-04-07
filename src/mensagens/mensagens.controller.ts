import { Controller, Get, Param } from '@nestjs/common';
import { MensagensService } from './mensagens.service';

@Controller('api/mensagens') // Todas as rotas comecam com /api/mensagens
export class MensagensController {
  // Injecao de dependencia (o NestJS da-nos o service automaticamente)
  constructor(private readonly mensagensService: MensagensService) {}

  // GET /api/mensagens -> devolve todas
  @Get()
  getAll() {
    return this.mensagensService.getAll();
  }

  // GET /api/mensagens/1 -> devolve a mensagem com id 1
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.mensagensService.getById(Number(id));
  }
}
