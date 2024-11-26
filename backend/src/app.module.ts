import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa TypeOrmModule
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ModuleModule } from './module/module.module';
import { ProjectsModule } from './projects/projects.module';
import { StudentsModule } from './students/students.module';
import { UsersModule } from './users/user.module';
import { UploadModule } from './upload/upload.module';
import { CategoryModule } from './category/category.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatModule } from './chat/chat.module';
import { Chat } from './chat/entities/chat.entity';
import { Message } from './chat/entities/message.entity';
import { User } from './chat/entities/user.entity';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ModuleModule,
    ProjectsModule,
    StudentsModule,
    UsersModule,
    UploadModule,
    FileModule,
    CategoryModule,
    ChatModule,
    // Configuración de TypeOrmModule
    TypeOrmModule.forRoot({
      type: 'sqlite', // Cambia esto según tu base de datos
      database: 'database.sqlite', // Archivo SQLite
      entities: [Chat, Message, User], // Asegúrate de incluir las entidades
      synchronize: true, // Sincronización automática de esquemas (desactiva en producción)
    }),
    // Configuración para servir archivos estáticos desde la carpeta 'uploads'
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Ruta donde se almacenan los archivos subidos
      serveRoot: '/uploads', // URL accesible para los archivos
    }),
  ],
})
export class AppModule {}
