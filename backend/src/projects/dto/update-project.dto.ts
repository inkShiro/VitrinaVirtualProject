import { IsString, IsBoolean, IsArray, IsOptional, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class FileDto {
  @IsString()
  fileUrl: string;
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  privacy?: boolean;

  @IsOptional()
  @IsString()
  license?: string;

  @IsOptional()
  @IsInt()
  authorId?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  collaborators?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  categories?: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileDto)
  files?: FileDto[];
}
