// users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';  // Asegúrate de crear este DTO

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear un nuevo usuario
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  // Obtener todos los usuarios
  async findAll() {
    return this.prisma.user.findMany();
  }

  // Obtener un usuario por ID
  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Obtener un usuario por email
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Actualizar un usuario
  async update(id: number, updateUserDto: CreateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // Eliminar un usuario
  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
