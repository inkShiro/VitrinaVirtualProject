// src/user/user.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return this.userService.createUser(data);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    const user = await this.userService.getUserById(Number(id));
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: Partial<User>): Promise<User> {
    return this.userService.updateUser(Number(id), data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(Number(id));
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
}
