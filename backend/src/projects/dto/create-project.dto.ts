import { IsString, IsBoolean, IsArray, IsOptional, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class FileDto {
  @IsString()
  fileUrl: string;
}

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  privacy: boolean; // o cambia a @IsString() si esperas "public"/"private"

  @IsString()
  license: string;

  @IsInt()
  authorId: number;

  @IsArray()
  @IsInt({ each: true })
  collaborators: number[];

  @IsArray()
  @IsInt({ each: true })
  categories: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileDto) // Necesario para validar correctamente los objetos dentro del array
  files?: FileDto[];
}
