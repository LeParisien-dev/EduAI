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

  // CORS configuration (local + Vercel frontend)
  app.enableCors({
    origin: [
      'http://localhost:5173',                   // Dev local
      'https://edu-ai-frontend-nine.vercel.app', // Domaine Vercel actuel
      'https://eduai-frontend.vercel.app',
    ],
    credentials: true,
  });

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port, '0.0.0.0');

  console.log(`EduAI API running on port ${port}`);
}
bootstrap();
