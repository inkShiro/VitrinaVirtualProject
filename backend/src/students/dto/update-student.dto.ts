import { IsString, IsInt, IsOptional, IsUrl, IsDateString } from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  studyProgram?: string;

  @IsString()
  @IsOptional()
  institution?: string;

  @IsString()
  @IsOptional()
  educationLevel?: string;

  @IsString()
  @IsOptional()
  academicInterests?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @IsUrl()
  @IsOptional()
  portfolioUrl?: string;
}
