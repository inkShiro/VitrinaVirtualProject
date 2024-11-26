import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Asegúrate de importar el servicio de Prisma
import { File } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}

  // Eliminar archivo de la base de datos y el sistema de archivos
  async deleteFile(fileId: number): Promise<{ message: string }> {
    const file = await this.prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      throw new Error('Archivo no encontrado');
    }

    // Si estás almacenando los archivos localmente, elimina el archivo físicamente
    const filePath = path.join(__dirname, '..', file.fileUrl); // Ajusta la ruta según donde almacenes los archivos
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Elimina el archivo físicamente
    }

    // Eliminar el registro del archivo en la base de datos
    await this.prisma.file.delete({
      where: { id: fileId },
    });

    return { message: 'Archivo eliminado exitosamente' };
  }
}
