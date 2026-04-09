// ====================================================
// app.service.ts — Serviço principal
// ====================================================

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Backend do Sistema de Notificações está a funcionar!';
  }

  getInfo(): object {
    return {
      nome: 'Sistema de Notificações do Coordenador',
      versao: '0.1.0',
      descricao: 'API para envio de notificações em tempo real',
      estado: 'em desenvolvimento',
    };
  }

  getHora(): object {
    const agora = new Date();
    return {
      data: agora.toLocaleDateString('pt-PT'),
      hora: agora.toLocaleTimeString('pt-PT'),
      timestamp: agora.toISOString(),
    };
  }
}
