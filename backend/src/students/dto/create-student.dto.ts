import { IsString, IsInt, IsOptional, IsUrl, IsDateString } from 'class-validator';

// create-student.dto.ts
export class CreateStudentDto {
    userId: number; // o user si quieres pasar más detalles
    studyProgram: string;
    institution: string;
    educationLevel: string;
    academicInterests: string;
    location: string;
    birthDate?: Date;
    portfolioUrl?: string;
    profilePicture?: string;
  }
  