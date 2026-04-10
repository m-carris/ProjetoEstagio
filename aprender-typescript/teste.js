// pedir ao user um número e mostrar-lhe o dobro
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question(`Digite um número: `, (numero) => {
    const dobro = Number(numero) * 2;
    console.log(`O dobro de ${numero} é ${dobro}`);
    readline.close();
});