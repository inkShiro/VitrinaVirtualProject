import { Controller, Delete, Param } from '@nestjs/common';
import { FileService } from './files.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Delete(':id')
  async deleteFile(@Param('id') id: string): Promise<{ message: string }> {
    const fileId = parseInt(id, 10);
    return this.fileService.deleteFile(fileId);
  }
}
