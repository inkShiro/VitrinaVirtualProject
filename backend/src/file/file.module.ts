import { Module } from '@nestjs/common';
import { FileService } from './files.service';
import { FileController } from './file.controller';
import { PrismaService } from '../prisma/prisma.service'; // Asegúrate de importar el servicio de Prisma

@Module({
  controllers: [FileController],
  providers: [FileService, PrismaService],
})
export class FileModule {}
