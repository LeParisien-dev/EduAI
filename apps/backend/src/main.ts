import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation globale des DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS activé pour le frontend local
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port, '0.0.0.0');

  console.log(`EduAI API running on http://localhost:${port}`);
}
bootstrap();
