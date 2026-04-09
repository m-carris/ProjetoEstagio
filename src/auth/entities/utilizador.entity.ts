// ====================================================
// utilizador.entity.ts — Entidade (tabela) de utilizadores
// ====================================================

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Utilizador {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: 'operador' })
  tipo!: 'coordenador' | 'operador';

  @CreateDateColumn()
  dataCriacao!: Date;
}
