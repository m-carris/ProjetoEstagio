// ====================================================
// main.ts — Ponto de entrada do servidor
// Este ficheiro arranca a aplicação NestJS na porta 3000
// ====================================================

// Importamos a "fábrica" do NestJS que sabe criar a aplicação
import { NestFactory } from '@nestjs/core';

// Importamos o módulo principal (a peça central que junta tudo)
import { AppModule } from './app.module';

// Esta função arranca o servidor
async function bootstrap() {
  // Cria a aplicação NestJS usando o módulo principal
  const app = await NestFactory.create(AppModule);

  // Inicia o servidor na porta 3000
  // Depois disto, podemos abrir http://localhost:3000 no browser
  await app.listen(3000);
  console.log('Servidor a correr em http://localhost:3000');
}

// Chama a função para arrancar tudo
// void indica que sabemos que é uma Promise e não precisamos de await aqui
void bootstrap();
