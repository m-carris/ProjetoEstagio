// primeiro.ts
// O meu primeiro programa em TypeScript!

// Em TypeScript, indicamos o TIPO de cada variável depois do nome
// variavel: tipo = valor

// String (texto)
const nome: string = 'Miguel';
const apelido: string = 'Serafim';

// Number (número)
const idade: number = 18;
const altura: number = 1.74;

// Boolean (verdadeiro/falso)
const ativo: boolean = true;

// O TypeScript sabe o tipo automaticamente (inferência de tipos)
// Não precisas de escrever o tipo sempre — ele adivinha!
const cidade = 'Lisboa'; // TypeScript sabe que é string

console.log(`${nome} ${apelido}, ${idade} anos, ${cidade}`);
// Maria Silva, 25 anos, Lisboa

// ==========================================
// FUNÇÕES COM TIPOS
// ==========================================

// Em JavaScript:     function soma(a, b) { return a + b; }
// Em TypeScript:     function soma(a: number, b: number): number { return a + b; }

function soma(a: number, b: number): number {
  return a + b;
}

console.log(soma(3, 5)); // 8

// Arrow function com tipos
const saudacao = (nome: string): string => {
  return `Olá, ${nome}!`;
};

console.log(saudacao('João')); // Olá, João!