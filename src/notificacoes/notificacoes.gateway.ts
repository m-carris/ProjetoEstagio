// ====================================================
// notificacoes.gateway.ts — Gateway de WebSockets
// ====================================================

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: true,
  },
})
export class NotificacoesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    console.log(`🔌 Cliente ligado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ Cliente desligado: ${client.id}`);
  }

  enviarParaTodos(mensagem: any) {
    console.log('📢 A enviar mensagem para todos os clientes...');
    this.server.emit('nova-mensagem', mensagem);
  }
}
