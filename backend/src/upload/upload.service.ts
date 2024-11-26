import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';  // Usamos UUID para generar nombres únicos
import { BadRequestException } from '@nestjs/common';

// Función para normalizar el nombre del archivo
function normalizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')  // Reemplaza caracteres no permitidos por guiones bajos
    .toLowerCase();  // Convierte todo a minúsculas
}

@Injectable()
export class UploadService {
  private readonly uploadDir = path.join(__dirname, '..', '..', 'uploads');
  private readonly baseUrl = 'http://localhost:4000/uploads'; // URL base para los archivos

  constructor() {
    // Verificar si el directorio de uploads existe, si no, crear uno
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  // Manejo de un solo archivo
  async handleFileUpload(file: Express.Multer.File) {
    try {
      const normalizedFilename = `${uuidv4()}_${normalizeFilename(file.originalname)}`;
      const filePath = path.join(this.uploadDir, normalizedFilename);

      // Escribimos el archivo en el sistema
      fs.writeFileSync(filePath, file.buffer);

      return {
        message: 'Archivo subido correctamente',
        filename: normalizedFilename,
        url: `${this.baseUrl}/${normalizedFilename}`, // URL pública del archivo
      };
    } catch (error) {
      throw new BadRequestException('Error al subir el archivo: ' + error.message);
    }
  }

  // Manejo de múltiples archivos
  async handleMultipleFilesUpload(files: Express.Multer.File[]) {
    try {
      const fileDetails = files.map((file) => {
        const normalizedFilename = `${uuidv4()}_${normalizeFilename(file.originalname)}`;
        const filePath = path.join(this.uploadDir, normalizedFilename);

        // Escribimos el archivo en el sistema
        fs.writeFileSync(filePath, file.buffer);

        return {
          message: 'Archivo subido correctamente',
          filename: normalizedFilename,
          url: `${this.baseUrl}/${normalizedFilename}`, // URL pública del archivo
        };
      });

      return fileDetails;
    } catch (error) {
      throw new BadRequestException('Error al subir los archivos: ' + error.message);
    }
  }
}
