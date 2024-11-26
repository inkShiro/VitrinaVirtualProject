import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Endpoint para crear una nueva categoría
  @Post()
  async create(@Body('name') name: string) {
    return this.categoryService.create(name);
  }

  // Endpoint para obtener todas las categorías
  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  // Endpoint para obtener una categoría por su ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  // Endpoint para actualizar una categoría
  @Patch(':id')
  async update(@Param('id') id: string, @Body('name') name: string) {
    return this.categoryService.update(+id, name);
  }

  // Endpoint para eliminar una categoría
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
