// users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';  // Asegúrate de tener PrismaService disponible

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],  // Registra PrismaService para usarlo en el servicio de usuarios
})
export class UsersModule {}
