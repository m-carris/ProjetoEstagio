// ====================================================
// create-mensagem.dto.ts — DTO para criar uma mensagem
// Um "DTO" (Data Transfer Object) define o formato dos dados
// que o cliente envia quando faz um pedido.
// É como um formulário: define que campos são obrigatórios.
// ====================================================

export class CreateMensagemDto {
  // O texto da mensagem (ex: "Acidente na Av. de Roma")
  texto!: string;

  // A prioridade: 'normal' ou 'alta'
  prioridade!: 'normal' | 'alta';
}
