import { Injectable } from '@nestjs/common';

@Injectable()
export class MensagensService {
  // Lista falsa de mensagens (depois vem da base de dados)
  private mensagens = [
    { id: 1, texto: 'Acidente na Av. de Roma', prioridade: 'alta' },
    { id: 2, texto: 'Transito intenso na 2a Circular', prioridade: 'normal' },
    { id: 3, texto: 'Avaria no autocarro 735', prioridade: 'alta' },
  ];

  // Devolve todas as mensagens
  getAll() {
    return this.mensagens;
  }

  // Devolve uma mensagem por ID
  getById(id: number) {
    return this.mensagens.find((m) => m.id === id);
  }
}
