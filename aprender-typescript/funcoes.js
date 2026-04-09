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


// ==================================
// 2. ARROW FUNCTIONS (FUNÇÕES SETA)
// ==================================
// Forma mais moderna e curta de escrever funções
// Usamos muito no NestJS!

const soma = (a, b) => {
    return a + b;
}

console.log(soma(10, 3));

// ===============================
// 3. FUNÇÕES COM OBJETOS
// ===============================

const criarMensagem = (texto, prioridade) => {
    return {
        texto: texto,
        prioridade: prioridade,
        dataCriacao: new Date().toLocaleDateString(`pt-PT`),
    };
};

const msg1 = criarMensagem(`Acidente na Av. Roma`, `alta`);
console.log(`Mensagem criada: `, msg1);

const msg2 = criarMensagem(`Tudo normal`, `normal`);
console.log(`Mensagem criada: `, msg2);

// ===============================
// 4. FUNÇÕES QUE CHAMAM OUTRAS FUNÇÕES
// ===============================

const formatarPrioridade = (prioridade) => {
    if (prioridade === `alta`) {
        return `Alta`;
    } else {
        return `Baixa`;
    }
}

const mostrarMensagem = (mensagem) => {
    const prioFormatada = formatarPrioridade(mensagem.prioridade);
    console.log(`[${prioFormatada}] ${mensagem.texto}`);


};

mostrarMensagem(msg1); // [ALTA] Acidente n Av. Roma
mostrarMensagem(msg2); // [NORMAL] Tudo normal

// ===============================
// 5. MÉTODOS DE ARRAYS ÚTEIS
// ===============================

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// .filter() - filtra elementos que cumprem uma condição
const pares = numeros.filter((n) => n % 2 === 0);
console.log(`Pares: `, pares); // 2,4,6,8,10

// .map() - transforma cada elemento
const dobros = numeros.map((n) => n * 2);
console.log(`Dobros: `, dobros); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// .find() - encontra o primeiro elemento que cumpre a condição
const primeiroMaiorQue5 = numeros.find((n) => n > 5);
console.log(`Número primeiro maior que 5: `, primeiroMaiorQue5); // 6

// .forEach() - executa algo para cada elemento (sem devolver nada)
console.log(`\nTodos os números: `);
numeros.forEach((n) => {
    console.log(` - ${n}`);
});


