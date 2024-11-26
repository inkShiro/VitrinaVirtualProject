import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear un nuevo estudiante
  // students.service.ts
    async create(createStudentDto: CreateStudentDto) {
        return this.prisma.student.create({
        data: {
            studyProgram: createStudentDto.studyProgram,
            institution: createStudentDto.institution,
            educationLevel: createStudentDto.educationLevel,
            academicInterests: createStudentDto.academicInterests,
            location: createStudentDto.location,
            birthDate: createStudentDto.birthDate,
            portfolioUrl: createStudentDto.portfolioUrl,
            profilePicture: createStudentDto.profilePicture,
            user: { connect: { id: createStudentDto.userId } }, // Conexión con User
        },
        });
    }
  

  // Obtener todos los estudiantes
  async findAll() {
    return this.prisma.student.findMany();
  }

  // Obtener un estudiante por ID
  async findOne(id: number) {
    return this.prisma.student.findUnique({
      where: {
        id: id,  // Aquí asegúrate de que `id` sea un número (no una cadena)
      },
    });
  }

  // Obtener un estudiante por userId
  async findByUserId(userId: number) {
    return this.prisma.student.findUnique({
      where: { userId },
    });
  }

  // Actualizar un estudiante
  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.prisma.student.update({
      where: { id },
      data: updateStudentDto,
    });
  }

  // Eliminar un estudiante
  async remove(id: number) {
    return this.prisma.student.delete({
      where: { id },
    });
  }
}
