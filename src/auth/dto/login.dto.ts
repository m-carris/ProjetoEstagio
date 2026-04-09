// ====================================================
// login.dto.ts — DTO para fazer login
// ====================================================

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'O email não é válido' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'A password não pode estar vazia' })
  password!: string;
}
