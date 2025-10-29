import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/pipes/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Función principal para arrancar la aplicación NestJS.
 */
async function bootstrap() {
  // Crea una instancia de la aplicación NestJS
  const app = await NestFactory.create(AppModule);

  const configDoc = new DocumentBuilder()
    .setTitle('API MujeresDigitales2025')
    .setDescription('Documentacion de la API desarrollada en NestJS para MujeresDigitales2025')
    .setVersion('2.4')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configDoc);
  SwaggerModule.setup('api/docs', app, document)

  // Registra el filtro de excepciones global para estandarizar las respuestas de error
  app.useGlobalFilters(new AllExceptionsFilter());
  // Registra el ValidationPipe global para aplicar las validaciones de DTOs
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,// Remueve propiedades que no están definidas en el DTO
    forbidNonWhitelisted: true,// Lanza error si llega un campo no esperado/no en la whitelist
    transform: true, // Transforma automáticamente los tipos de los DTOs
    transformOptions: {enableImplicitConversion: true}// Habilita la conversión de tipos implícita (ej. string a number)
  }))

  // Obtiene el puerto de las variables de entorno o usa 3000 por defecto
  const port = process.env.PORT || 3000;
  // Inicia el servidor
  await app.listen(port);

  console.log(`Application running on: http://localhost:${port}`)
}
bootstrap();
