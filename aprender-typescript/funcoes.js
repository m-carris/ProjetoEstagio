// funcoes.js
// Aprender funções - blocos de código reutilizáveis

// ==============================
// 1. O QUE É UMA FUNÇÃO?
// ==============================
// Uma função é um bloco de código que:
// - Tem um nome
// - Pode receber dados (parâmetros)
// - Pode devolver um resultado (return)
// - Pode ser chamada (executada) várias vezes

// Forma clássica de criar uma função
function saudacao(nome) {
    return `Olá, ` + nome;
}

// Chamar (executar)a função
const frase = saudacao(`Miguel`);
console.log(frase);

console.log(saudacao(`Miguel`));
