// projects.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        title: createProjectDto.title,
        description: createProjectDto.description,
        privacy: createProjectDto.privacy,
        license: createProjectDto.license,
        author: { connect: { id: createProjectDto.authorId } },
        collaborators: { 
          connect: createProjectDto.collaborators.map(collaboratorId => ({ id: collaboratorId })) 
        },
        categories: { 
          connect: createProjectDto.categories.map(categoryId => ({ id: categoryId })) 
        },
        files: { create: createProjectDto.files },
      },
    });
  }

  async findAll() {
    return this.prisma.project.findMany({
      include: {
        author: true,
        collaborators: true,
        categories: true,
        files: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.project.findUnique({
      where: { id },
      include: {
        author: true,
        collaborators: true,
        categories: true,
        files: true,
      },
    });
  }

  async findByAuthorId(authorId: number) {
    return this.prisma.project.findMany({
      where: {
        authorId: authorId, // Correctly reference the authorId field
      },
      include: {
        author: true,
        collaborators: true,
        categories: true,
        files: true,
      }
    });
  }

  async findByCollaboratorId(collaboratorId: number) {
    return this.prisma.project.findMany({
      where: {
        collaborators: {
          some: {
            id: collaboratorId, // Correctly reference the collaborator's id field
          }
        }
      },
      include: {
        author: true,
        collaborators: true,
        categories: true,
        files: true,
      }
    });
  }

  async remove(id: number) {
    return this.prisma.project.delete({
      where: { id },
    });
  }
  
  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const { collaborators, categories, files, ...rest } = updateProjectDto;

    return this.prisma.project.update({
      where: { id },
      data: {
        ...rest,
        ...(collaborators && {
          collaborators: {
            set: collaborators.map(collaboratorId => ({ id: collaboratorId })),
          },
        }),
        ...(categories && {
          categories: {
            set: categories.map(categoryId => ({ id: categoryId })),
          },
        }),
        ...(files && {
          files: {
            deleteMany: {}, // Opcional: elimina los archivos existentes
            create: files,
          },
        }),
      },
      include: {
        author: true,
        collaborators: true,
        categories: true,
        files: true,
      },
    });
  }
}
