// ====================================================
// main.ts — Ponto de entrada do servidor
// ====================================================

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativar CORS — permite que o frontend e a extensão
  // comuniquem com o backend
  app.enableCors({
    origin: true,
  });

  // Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
  console.log('✅ Servidor a correr em http://localhost:3000');
}

void bootstrap();
