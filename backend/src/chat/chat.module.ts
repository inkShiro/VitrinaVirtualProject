import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [], // Si tu módulo depende de otros módulos, los importas aquí
  providers: [ChatService, PrismaService, ChatGateway],
  exports: [ChatService], // Exponemos solo el servicio si no es necesario exportar el Gateway
  controllers: [ChatController],
})
export class ChatModule {}
