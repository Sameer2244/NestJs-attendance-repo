import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically strips properties that don't exist in the DTO
      forbidNonWhitelisted: true, // Throws an error if extra properties are sent
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Attendance example')
    .setDescription('The Attendance API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
