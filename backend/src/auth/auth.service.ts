import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common'; 
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(data: { email: string; password: string; fullName: string; userType: string; additionalData: any }) {
    // Validar que el correo electrónico, nombre y contraseña no estén vacíos
    if (!data.email || !data.fullName || !data.password) {
      throw new BadRequestException('El correo electrónico, el nombre completo y la contraseña son obligatorios');
    }

    // Validación de la contraseña (debe tener entre 8 y 12 caracteres y contener al menos una letra y un número)
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
    if (!passwordPattern.test(data.password)) {
      throw new BadRequestException('La contraseña debe tener entre 8 y 12 caracteres y contener al menos una letra y un número');
    }

    // Verifica si el correo ya existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      // Si el correo ya está en uso, lanza un error con código de conflicto (409)
      throw new ConflictException('El correo electrónico ya está en uso');
    }

    // Si no existe, procede con el registro del usuario
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        fullName: data.fullName,
        userType: data.userType,
      },
    });

    // Crear el perfil de acuerdo al tipo de usuario
    if (data.userType === 'student') {
      // Crear perfil de estudiante
      await this.prisma.student.create({
        data: {
          userId: user.id,
          studyProgram: data.additionalData.studyProgram,
          institution: data.additionalData.institution,
          educationLevel: data.additionalData.educationLevel,
          academicInterests: data.additionalData.academicInterests,
          location: data.additionalData.location,
          birthDate: new Date(data.additionalData.birthDate), // Asegúrate de convertir a un objeto Date
          portfolioUrl: data.additionalData.portfolioUrl,
        },
      });
    } else if (data.userType === 'company') {
      // Crear perfil de empresa
      await this.prisma.company.create({
        data: {
          userId: user.id,
          industry: data.additionalData.industry,
          companySize: data.additionalData.companySize,
          location: data.additionalData.location,
          websiteUrl: data.additionalData.websiteUrl,
          description: data.additionalData.description,
          contactRole: data.additionalData.contactRole,
          collaborationGoals: data.additionalData.collaborationGoals,
        },
      });
    }

    return this.generateToken(user);
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('El correo electrónico y la contraseña son obligatorios');
    }
  
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Credenciales no válidas');
    }
  
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales no válidas');
    }
  
    // Generar el token e incluir el id del usuario
    const token = await this.generateToken(user);
  
    // Retornar el token y el id del usuario
    return {
      access_token: token,
      user_id: user.id, // Incluyendo el id del usuario
    };
  }
  

  private generateToken(user: any) {
    const payload = { sub: user.id, email: user.email, userType: user.userType };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'default_secret', {
      expiresIn: '1h',
    });
    return { access_token: token };
  }
}
