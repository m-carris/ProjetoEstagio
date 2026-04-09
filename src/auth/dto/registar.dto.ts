// ====================================================
// registar.dto.ts — DTO para registar um utilizador
// ====================================================

import { IsEmail, IsIn, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegistarDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  nome!: string;

  @IsEmail({}, { message: 'O email não é válido' })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'A password tem de ter pelo menos 6 caracteres' })
  password!: string;

  @IsIn(['coordenador', 'operador'], {
    message: 'O tipo tem de ser "coordenador" ou "operador"',
  })
  tipo!: 'coordenador' | 'operador';
}
