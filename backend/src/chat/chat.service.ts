import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear un nuevo chat entre dos usuarios
  async createChat(user1Id: number, user2Id: number) {
    const user1 = await this.prisma.user.findUnique({
      where: { id: user1Id },
    });
    const user2 = await this.prisma.user.findUnique({
      where: { id: user2Id },
    });

    if (!user1 || !user2) {
      throw new Error('Usuarios no encontrados');
    }

    // Verificar si ya existe un chat entre estos dos usuarios
    const existingChat = await this.prisma.chat.findFirst({
      where: {
        AND: [
          { users: { some: { id: user1.id } } },
          { users: { some: { id: user2.id } } },
        ],
      },
    });

    if (existingChat) {
      throw new Error('Ya existe un chat entre estos usuarios');
    }

    const newChat = await this.prisma.chat.create({
      data: {
        users: {
          connect: [{ id: user1.id }, { id: user2.id }],
        },
      },
    });

    return newChat;
  }

  // Obtener un chat por su ID
  async getChatById(chatId: number) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        users: true,
        messages: true,
      },
    });

    if (!chat) {
      throw new Error('Chat no encontrado');
    }

    return chat;
  }

  // Enviar un mensaje dentro de un chat
  async sendMessage(chatId: number, senderId: number, content: string) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: { users: true },
    });

    if (!chat) {
      throw new Error('Chat no encontrado');
    }

    const sender = await this.prisma.user.findUnique({
      where: { id: senderId },
    });

    if (!sender) {
      throw new Error('Usuario no encontrado');
    }

    // Asegúrate de que el receptor esté presente, en este caso el otro usuario en el chat
    const receiver = chat.users.find((user) => user.id !== senderId);
    if (!receiver) {
      throw new Error('Receptor no encontrado');
    }

    const newMessage = await this.prisma.message.create({
      data: {
        content,
        sender: { connect: { id: sender.id } },
        receiver: { connect: { id: receiver.id } },
        chat: { connect: { id: chat.id } },
      },
    });

    return newMessage;
  }

  // Obtener todos los mensajes de un chat
  async getMessages(chatId: number) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: { messages: true },
    });

    if (!chat) {
      throw new Error('Chat no encontrado');
    }

    return chat.messages;
  }

  // Obtener chats por usuario
  async getChatsByUserId(userId: number) {
    return this.prisma.chat.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: true,
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }
  
}
