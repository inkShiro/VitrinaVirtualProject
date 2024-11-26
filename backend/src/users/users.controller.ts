// users.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';  // Asegúrate de crear este DTO

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Crear un nuevo usuario
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Obtener todos los usuarios
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // Obtener un usuario por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userId = parseInt(id, 10);  // Convierte el id de string a number
    return this.usersService.findOne(userId);
  }

  // Obtener un usuario por email
  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  // Actualizar un usuario
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    const userId = parseInt(id, 10);  // Convierte el id de string a number
    return this.usersService.update(userId, updateUserDto);
  }

  // Eliminar un usuario
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const userId = parseInt(id, 10);  // Convierte el id de string a number
    return this.usersService.remove(userId);
  }
}
