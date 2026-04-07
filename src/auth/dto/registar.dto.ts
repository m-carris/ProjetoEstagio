// ====================================================
// registar.dto.ts — DTO para registar um novo utilizador
// Define os campos necessários para criar uma conta.
// ====================================================

export class RegistarDto {
  // Nome do utilizador
  nome!: string;

  // Email (será usado para fazer login)
  email!: string;

  // Password (será encriptada antes de guardar)
  password!: string;

  // Tipo: 'coordenador' ou 'operador'
  tipo!: 'coordenador' | 'operador';
}
