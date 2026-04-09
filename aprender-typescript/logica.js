// logic.js
// Aprender condições (if/else) e ciclos (for/while)

// ==============================
// 1. CONDIÇÕES - if / else
// ==============================
// "Se isto acontecer, faz aquilo. Senão, faz outra coisa."

const temperatura = 6;

if (temperatura > 30) {
    console.log("Está muito calor");
} else if (temperatura > 20 ) {
    console.log("EStá bom tempo!");
} else if (temperatura > 10) {
    console.log("Está algum frio");
} else {console.log("Está frio")};

// Operadores de comparação:
// > maior que
// < menor que
// >= maior ou igual
// <= menor ou igual
// === igual (usa SEMPRE três iguais em JavaScript!)
// !== diferente

const idade = 18;

if (idade >= 18) {
    console.log(`É maior de idade`);
} else {
    console.log(`É menor de idade`);
}

// Operadores lógicos:
// && (E) - ambas as condições têm de ser verdadeiras
// || (OU) - basta uma ser verdadeira
// ! (NÃO) - inverte o valor

const temBilhete = true;
const temIdade = true;

if (temBilhete && temIdade === true) {
    console.log(`Pode entrar!`);
} else {
    console.log(`Não pode entrar!`);
}

// ==============================
// 2. CICLOS FOR - repetir algo x vezes
// ==============================
// for (inicio; condição; incremento)

console.log(`\n--- Ciclo for ---`);

// Contar de 1 a 5
for (let i = 1; i <= 5; i++) {
    console.log(`Número: `, i);
}
// Resultado:
// Número: 1
// Número: 2
// Número: 3
// Número: 4
// Número: 5

// Percorrer um array
const cores = [`vermelho`, `verde`, `azul`];

for (let i = 0; i < cores.length; i++) {
    console.log(`Cor ${i}: ${cores[i]}`);
}

// Forma mais moderna de percorrer arrays: for...of
console.log(`\n--- for...of ---`);
for (const cor of cores) {
    console.log(`Cor: `, cor);
}

// ==============================
// 3. CICLO WHILE - repetir enquanto condição for verdadeira
// ==============================

console.log(`\n---Ciclo while ---`);

let contador = 1;

while (contador <= 3) {
    console.log(`Contador: `, contador);
    contador++;
}

// Resultado:
// Contador: 1
// Contador: 2
// Contador: 3

// ===============================
// 4. EXERCÍSIO PRÁTICO
// ===============================

console.log(`\n--- EXERCÍSIO PRÁTICO ---`);

// Temos uma lista de mensagens com prioridades
const mensagens = [
    { texto: 'Acidente na Av. Roma', prioridade: 'alta' },
    { texto: 'Trânsito normal', prioridade: 'normal' },
    { texto: 'Avaria no autocarro 735', prioridade: 'alta' },
    { texto: 'Tudo ok na linha 28', prioridade: 'normal' },
]

for (const alertaAtual of mensagens) {
    if (alertaAtual.prioridade === `alta`) {
        console.log(`URGENTE: `, alertaAtual.texto);       
    }
}

// Resultado:
// URGENTE: Acidente na Av. Roma
// URGENTE: Avaria no autocarro 735



