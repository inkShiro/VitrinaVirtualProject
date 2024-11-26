import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // Crear un estudiante
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  // Obtener todos los estudiantes
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  // Obtener un estudiante por ID
  @Get(':id')
    async getStudent(@Param('id') id: string) {
    const studentId = parseInt(id, 10); // Convierte a número
    return this.studentsService.findOne(studentId);
    }

    // Obtener estudiante por userId
  @Get('user/:userId')
  async getStudentByUserId(@Param('userId') userId: string) {
    const parsedUserId = parseInt(userId, 10); // Convierte el userId de string a number
    return this.studentsService.findByUserId(parsedUserId);
  }


  // Actualizar un estudiante
  @Put(':id')
  update(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  // Eliminar un estudiante
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.studentsService.remove(id);
  }
}
