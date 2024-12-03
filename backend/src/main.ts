import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Usar el puerto proporcionado por el entorno o 4000 por defecto
  const port = process.env.PORT || 4000;
  
  // Establecer un prefijo global para las rutas de la API
  app.setGlobalPrefix('api');

  // Configuración de Swagger solo en desarrollo
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addTag('cats')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  // Habilitar CORS para todos los orígenes
  app.enableCors({
    origin: true, // Permitir todas las direcciones
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true, // Permitir envío de cookies o credenciales
  });

  // Usar IoAdapter para WebSocket
  app.useWebSocketAdapter(new IoAdapter(app));

  // Escuchar en el puerto adecuado
  await app.listen(port, () => {
    console.log(`Application is running on: http://localhost:${port}`);
  });
}

bootstrap();
