import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { User } from './entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Crear un nuevo chat entre dos usuarios
  async createChat(user1Id: number, user2Id: number): Promise<Chat> {
    const user1 = await this.userRepository.findOne({
      where: { id: user1Id },
    });
    const user2 = await this.userRepository.findOne({
      where: { id: user2Id },
    });

    if (!user1 || !user2) {
      throw new Error('Usuarios no encontrados');
    }

    const newChat = this.chatRepository.create({
      users: [user1, user2],
    });

    return this.chatRepository.save(newChat);
  }

  // Obtener un chat por su ID
  async getChatById(chatId: number): Promise<Chat> {
    const chat = await this.chatRepository.findOne({
      where: { id: chatId },
      relations: ['users', 'messages'],
    });

    if (!chat) {
      throw new Error('Chat no encontrado');
    }

    return chat;
  }

  // Enviar un mensaje dentro de un chat
  async sendMessage(chatId: number, senderId: number, content: string): Promise<Message> {
    const chat = await this.chatRepository.findOne({
      where: { id: chatId },
      relations: ['users'],
    });

    if (!chat) {
      throw new Error('Chat no encontrado');
    }

    const sender = await this.userRepository.findOne({
      where: { id: senderId },
    });

    if (!sender) {
      throw new Error('Usuario no encontrado');
    }

    const newMessage = this.messageRepository.create({
      content,
      sender,
      chat,
    });

    return this.messageRepository.save(newMessage);
  }

  // Obtener todos los mensajes de un chat
  async getMessages(chatId: number): Promise<Message[]> {
    const chat = await this.chatRepository.findOne({
      where: { id: chatId },
      relations: ['messages'],
    });

    if (!chat) {
      throw new Error('Chat no encontrado');
    }

    return chat.messages;
  }
}
