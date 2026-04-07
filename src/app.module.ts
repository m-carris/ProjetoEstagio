import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MensagensModule } from './mensagens/mensagens.module';

@Module({
  imports: [MensagensModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
