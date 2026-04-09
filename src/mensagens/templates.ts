// ====================================================
// templates.ts — Templates de mensagens pré-definidas
// ====================================================

export interface TemplateMensagem {
  id: number;
  nome: string;
  icone: string;
  textoBase: string;
  prioridade: 'normal' | 'alta';
}

export const TEMPLATES: TemplateMensagem[] = [
  {
    id: 1,
    nome: 'Acidente',
    icone: '🚗',
    textoBase: 'Acidente reportado: ',
    prioridade: 'alta',
  },
  {
    id: 2,
    nome: 'Trânsito Intenso',
    icone: '🚦',
    textoBase: 'Trânsito intenso: ',
    prioridade: 'normal',
  },
  {
    id: 3,
    nome: 'Avaria',
    icone: '🔧',
    textoBase: 'Avaria reportada: ',
    prioridade: 'alta',
  },
  {
    id: 4,
    nome: 'Desvio',
    icone: '↩️',
    textoBase: 'Desvio em vigor: ',
    prioridade: 'normal',
  },
  {
    id: 5,
    nome: 'Informação',
    icone: 'ℹ️',
    textoBase: 'Informação: ',
    prioridade: 'normal',
  },
];
