// ====================================================
// create-mensagem.dto.ts — DTO com validação
// ====================================================

import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateMensagemDto {
  @IsString({ message: 'O texto tem de ser uma string' })
  @IsNotEmpty({ message: 'O texto não pode estar vazio' })
  texto!: string;

  @IsIn(['normal', 'alta'], {
    message: 'A prioridade tem de ser "normal" ou "alta"',
  })
  prioridade!: 'normal' | 'alta';
}
