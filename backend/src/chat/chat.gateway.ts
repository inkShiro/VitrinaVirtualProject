import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*', // Cambia '*' a tu dominio en producción
    },
  })
  export class ChatGateway {
    @WebSocketServer() server: Server;
  
    // Evento para manejar la conexión
    handleConnection(client: Socket) {
      const chatId = client.handshake.query.chatId as string; // chatId pasado al conectarse
      if (chatId) {
        client.join(chatId); // Unir al cliente a la sala específica
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
      if (!data.message || !data.chatId) {
        client.emit('error', { message: 'Datos incompletos: mensaje o chatId faltante' });
        return;
      }
  
      console.log(`Mensaje recibido: ${data.message} en el chat: ${data.chatId}`);
  
      // Emitir mensaje a todos los clientes en la sala específica
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
      if (!data.chatId) {
        client.emit('error', { message: 'chatId faltante' });
        return;
      }
  
      client.join(data.chatId);
      console.log(`Cliente ${client.id} unido manualmente al chat: ${data.chatId}`);
      client.emit('joined_chat', { chatId: data.chatId });
    }
  }
  