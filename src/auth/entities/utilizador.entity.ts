// ====================================================
// utilizador.entity.ts — Entidade (tabela) de utilizadores
// Guarda os dados de cada utilizador do sistema
// (coordenadores e operadores).
// ====================================================

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity() diz ao TypeORM: "Cria uma tabela com estes campos"
@Entity()
export class Utilizador {
  // Id gerado automaticamente (1, 2, 3...)
  @PrimaryGeneratedColumn()
  id!: number;

  // Nome do utilizador (ex: "João Silva")
  @Column()
  nome!: string;

  // Email do utilizador (tem de ser único — não pode haver dois iguais)
  @Column({ unique: true })
  email!: string;

  // Password do utilizador (guardada encriptada, nunca em texto simples!)
  @Column()
  password!: string;

  // Tipo de utilizador: 'coordenador' (envia mensagens) ou 'operador' (recebe)
  // Se não dissermos nada, o valor padrão é 'operador'
  @Column({ default: 'operador' })
  tipo!: 'coordenador' | 'operador';
}
