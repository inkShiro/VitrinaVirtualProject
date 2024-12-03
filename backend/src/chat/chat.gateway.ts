import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Controller, Get, OnModuleInit } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: true, // Cambia esto según la configuración de CORS de tu servidor
  },
})
@Controller('chat') // Ruta para el testeo de WebSocket
export class ChatGateway implements OnModuleInit {
  @WebSocketServer() server: Server;

  // Método que se ejecuta cuando el módulo se ha inicializado y el WebSocket está listo
  onModuleInit() {
    console.log('Servidor WebSocket cargado y listo para aceptar conexiones');
  }

  // Endpoint HTTP para testear si el servidor está funcionando
  @Get('test')
  testWebSocket() {
    return { message: 'Servidor WebSocket está funcionando' };
  }

  // Evento para manejar la conexión
  handleConnection(client: Socket) {
    const chatId = client.handshake.query.chatId as string;

    // Log para verificar el chatId recibido
    console.log('chatId recibido:', chatId);

    if (chatId) {
      client.join(chatId); // Unir al cliente a la sala del chat
      console.log(`Cliente conectado: ${client.id}, unido al chat: ${chatId}`);
    } else {
      console.log(`Cliente conectado sin chatId: ${client.id}`);
    }
  }

  // Evento para manejar la desconexión
  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  // Evento para recibir un mensaje de un cliente y enviarlo solo a la sala correspondiente
  @SubscribeMessage('send_message')
  handleMessage(
    @MessageBody() data: { message: string; chatId: string },
    @ConnectedSocket() client: Socket,
  ) {
    // Validación de los datos recibidos
    if (!data.message || !data.chatId) {
      client.emit('error', { message: 'Datos incompletos: mensaje o chatId faltante' });
      console.error('Error: Datos incompletos.'); // Log de error
      return;
    }

    // Log para verificar el mensaje recibido
    console.log(`Mensaje recibido: ${data.message} en el chat: ${data.chatId}`);

    // Emitir mensaje a todos los clientes en la sala específica (chatId)
    this.server.to(data.chatId).emit('receive_message', {
      message: data.message,
      chatId: data.chatId,
      senderId: client.id,
    });
  }

  // Evento opcional: un cliente se une manualmente a una sala
  @SubscribeMessage('join_chat')
  handleJoinChat(
    @MessageBody() data: { chatId: string },
    @ConnectedSocket() client: Socket,
  ) {
    // Validación para asegurar que el chatId esté presente
    if (!data.chatId) {
      client.emit('error', { message: 'chatId faltante' });
      console.error('Error: chatId faltante'); // Log de error
      return;
    }

    // Unir al cliente manualmente a la sala correspondiente
    client.join(data.chatId);
    console.log(`Cliente ${client.id} unido manualmente al chat: ${data.chatId}`);

    // Emitir una confirmación de unión al chat
    client.emit('joined_chat', { chatId: data.chatId });
  }
}
