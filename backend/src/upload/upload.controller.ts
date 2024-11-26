import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { HttpStatus } from '@nestjs/common';
import { ParseFilePipeBuilder } from '@nestjs/common';

@ApiTags('Uploading Files')
@Controller('files')
@ApiConsumes('multipart/form-data')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // Endpoint para subir un solo archivo
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  }))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    )
    file: Express.Multer.File
  ) {
    try {
      return await this.uploadService.handleFileUpload(file);
    } catch (error) {
      this.handleUploadError(error);
    }
  }

  // Endpoint para subir múltiples archivos
  @Post('upload/multiple')
  @UseInterceptors(FilesInterceptor('files', 10, {
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB por archivo
  }))
  async uploadFiles(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    )
    files: Express.Multer.File[]
  ) {
    try {
      return await this.uploadService.handleMultipleFilesUpload(files);
    } catch (error) {
      this.handleUploadError(error);
    }
  }

  // Método para manejar errores de carga
  private handleUploadError(error: any) {
    if (error.message.includes('file size')) {
      throw new BadRequestException('El tamaño del archivo excede el límite permitido (10MB)');
    }
    if (error.message.includes('Invalid file type')) {
      throw new BadRequestException('El tipo de archivo no es válido. Solo se permiten imágenes (JPG, JPEG, PNG, GIF)');
    }
    throw new BadRequestException('Error al cargar el archivo: ' + error.message);
  }
}
