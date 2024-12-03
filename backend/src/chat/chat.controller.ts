import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('user/:userId')
  async getChats(@Param('userId') userId: string) {
    try {
      const userIdNumber = parseInt(userId, 10);
      if (isNaN(userIdNumber)) {
        throw new Error('El userId debe ser un número válido');
      }
      return await this.chatService.getChatsByUserId(userIdNumber);
    } catch (error) {
      throw new Error('Error al obtener los chats: ' + error.message);
    }
  }

  @Post('create')
  async createChat(@Body() createChatDto: CreateChatDto) {
    try {
      const newChat = await this.chatService.createChat(createChatDto.user1Id, createChatDto.user2Id);
      return newChat;
    } catch (error) {
      throw new Error('Error al crear el chat: ' + error.message);
    }
  }

  @Get(':chatId/messages')
  async getMessages(@Param('chatId') chatId: string) {
    try {
      const chatIdNumber = parseInt(chatId, 10);
      if (isNaN(chatIdNumber)) {
        throw new Error('El chatId debe ser un número válido');
      }
      const messages = await this.chatService.getMessages(chatIdNumber);
      return messages;
    } catch (error) {
      throw new Error('Error al obtener los mensajes: ' + error.message);
    }
  }

  // Endpoint para enviar un mensaje en un chat
  @Post(':chatId/messages')
  async sendMessage(
    @Param('chatId') chatId: string,
    @Body() body: { senderId: number; content: string },
  ) {
    try {
      const chatIdNumber = parseInt(chatId, 10);
      if (isNaN(chatIdNumber)) {
        throw new Error('El chatId debe ser un número válido');
      }

      const { senderId, content } = body;
      if (!content || !senderId) {
        throw new Error('Debe proporcionar senderId y contenido del mensaje');
      }

      const newMessage = await this.chatService.sendMessage(chatIdNumber, senderId, content);
      return newMessage;
    } catch (error) {
      throw new Error('Error al enviar el mensaje: ' + error.message);
    }
  }

  // Endpoint para verificar el estado del WebSocket
  @Get('test/ws-status')
  checkWebSocketStatus() {
    return { message: 'Servidor WebSocket está en línea y funcionando' };
  }
}
