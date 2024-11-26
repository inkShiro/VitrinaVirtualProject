import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear una categoría
  async create(name: string): Promise<Category> {
    return this.prisma.category.create({
      data: { name },
    });
  }

  // Obtener todas las categorías
  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  // Obtener una categoría por su ID
  async findOne(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  // Actualizar una categoría
  async update(id: number, name: string): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: { name },
    });
  }

  // Eliminar una categoría
  async remove(id: number): Promise<Category> {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
