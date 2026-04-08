// ============================================
// CÓDIGO ORIGINAL — gerado por IA
// Comentado para o guião de aprendizagem
// Vais reescrever este ficheiro passo a passo!
// ============================================
/*
// ====================================================
// mensagem.entity.ts — Entidade (tabela) de mensagens
// Uma "entidade" representa uma tabela na base de dados.
// Cada campo aqui será uma coluna na tabela "mensagem".
// ====================================================

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

// @Entity() diz ao TypeORM: "Cria uma tabela na base de dados com estes campos"
@Entity()
export class Mensagem {
  // @PrimaryGeneratedColumn() = coluna "id" que é gerada automaticamente (1, 2, 3...)
  @PrimaryGeneratedColumn()
  id!: number;

  // @Column() = uma coluna normal na tabela
  // "texto" guarda o conteúdo da mensagem (ex: "Acidente na Av. de Roma")
  @Column()
  texto!: string;

  // "prioridade" pode ser 'normal' ou 'alta'
  // Se não enviarmos nada, o valor padrão é 'normal'
  @Column({ default: 'normal' })
  prioridade!: 'normal' | 'alta';

  // @CreateDateColumn() = o TypeORM preenche automaticamente com a data/hora atual
  @CreateDateColumn()
  dataCriacao!: Date;
}

*/
