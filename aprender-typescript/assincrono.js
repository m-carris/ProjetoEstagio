// assincrono.js
// Aprender código assíncrono - Promises e async/await

// ==============================
// 1. O PROBLEMA
// ==============================
// Imagina que vais buscar dados a uma base de dados.
// Isso demora tempo (talvez 1 segundo).
// Não queres que o programa fique "congelado" á espera.

// Vamos simular uma operação que demora tempo


const buscarDados = () => {
    return new Promise((resolve) => {
        // setTimeout simula algo que demora 2 segundos
        setTimeout(() => {
            resolve(`Dados encontrados!`);
        }, 2000);
    });
};

// ==============================
// 2. USANDO ASYNC/AWAIT
// ==============================
// "async" diz que a função é assíncrona
// "await" diz "espera aqui até ter a resposta"

const programa = async () => {
    console.log(`1. A iniciar...`);
    console.log(`2. A buscar dados (vai demorar 2 segundos)...`);

    // "await" espera pela resposta sem bloquear o programa
    const resultado = await buscarDados();

    console.log(`3. Resultado: `, resultado);
    console.log(`4. Concluído!`);
};

// Executar
programa();

// ==============================
// 3. EXEMPLO PRÁTICO - Simular API de mensagens
// ==============================

// Simular uma "base de dados" de mensagens
const baseDeDados = [
    { id: 1, texto: `Acidente na Av. Roma`, prioridade: `alta` },
    { id: 2, texto: `Tudo normal`, prioridade: `normal`},
    { id: 3, texto: `Avaria autocarro 735`, prioridade: `alta` },
];

// Simular ir buscar mensagens (como se fosse á base de dados)

const buscarMensagens = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(baseDeDados);
        }, 1000);
    });
};

// Simular buscar uma mensagem por id
const buscarMensagemPorId = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const mensagem = baseDeDados.find(m => m.id === id);
            if (mensagem) {
                resolve(mensagem);
            } else {
                reject(`Mensagem com id ${id} não encontrada!`);
            }
        }, 500);
    });
};

// Usar as funções assíncronas
const testarMensagens = async () => {
    console.log(`\n--- Teste de Mensagens ---`);
};

// Buscar todas
const todas = await buscarMensagens();
console.log(`Todas as mensagens:`, todas);

// Buscar por id
const msg = await buscarMensagemPorId(2);
console.log(`Mensagem 2:`, msg);

// Tratar erros com try/catch
try {
    const msgInexistente = await buscarMensagemPorId(99);
    console.log(msgInexistente);
} catch (erro) {
    console.log(`Erro:`, erro);
    // Resposta: Erro: Mensagem com id 99 não encontrada!
};

// Executar depois de 3 segundos (para não misturar com o exemplo anterior)
setTimeout(() => {
  testarMensagens();
}, 3000);

