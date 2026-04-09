// variaveis.js
// Aprender sobre variáveis em JavaScript

//==============================
// 1. CRIAR VARIÁVEIS
//==============================

//Usamos "let" para criar variáveis que podem mudar
let nome = "Miguel";
let idade = 18;
let altura = 1.74;

console.log("Nome: ", nome);
console.log("Idade: ", idade);
console.log("Altura: ", altura);

// Podemos mudar o valor de uma variável criada co "let"
idade = 19;
console.log("Nova idade: ", idade);

// Usamos "const" para valores que NUNCA mudam
const paisNascimento = "Portugal";
console.log("País: ", paisNascimento); // País: Portugal

// Se tentares mudar um "const" dá erro:
// paisNascimento = "Espanha"; ERRO! Não podes mudar um const

//==============================
// 2. TIPOS DE DADOS
//==============================

// String (texto) - sempre entre aspas
const saudacao = "Olá!";
const frase = "Isto também é uma string.";
const template = `O meu nome é ${nome} e tenho ${idade} anos.`; // Template string
console.log(template); // O meu nome é Miguel e tenho 19 anos.

// Number (números) - inteiros e decimais
const inteiro = 42;
const decimal = 3.14;
const negativo = -10;

// Boolean (verdadeiro ou falso) - só pode ser true ou false
const estaChuva = true;
const eDeFimDeSemana = false;

console.log("EStá a chover? ", estaChuva);
console.log("É fim de semana? ", eDeFimDeSemana);

// null - "vazio de propósito" (decidimos que não tem valor)
const resultado = null;

// undefined - "ainda não tem valor" (não foi definido)
let futuro;
console.log("Futuro: ", futuro);

// ==============================
// 3. ARRAYS (LISTAS)
// ==============================

// Um array é uma lista ordenada de valores
const frutas = ["maçã", "banana", "laranja"];
console.log("Frutas: ", frutas);

// Aceder a um elemento (começa no índice 0!)
console.log("Primeira fruta: ", frutas[0]); // maçã
console.log("Segunda fruta: ", frutas[1]); // banana
console.log("TErceira fruta: ", frutas[2]); // laranja

// Adicionar um elemento ao fim
frutas.push("uva");
console.log("Depois de push: ", frutas); // ["maçã", "banana", "laranja", "uva"]

// Ver quantos elementos tem
console.log("Quantidade: ", frutas.length); // 4

// ==============================
// 4. OBJETOS
// ==============================

// Um objeto agrupa vários dados relacionados
const pessoa = {
    nome: `Miguel`,
    idade: 18,
    cidade: `Lisboa`,
    ativo: true,
};

console.log(`Pessoa: `, pessoa);
console.log(`Nome da pessoa: `, pessoa.nome); // Miguel
console.log(`Cidade: `, pessoa.cidade);

// Podemos mudar valores do objeto
pessoa.idade = 19;
console.log(`Nova idade: `, pessoa.idade); // 19