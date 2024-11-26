// dto/create-user.dto.ts
export class CreateUserDto {
    email: string;
    password: string;
    fullName: string;
    userType: string;  // Puedes usar un tipo de enumeración para manejar los tipos de usuario si lo prefieres
  }
  