import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Active la validation automatique des DTOs (class-validator)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Active CORS (frontend hébergé sur Vercel, backend sur Render)
  app.enableCors();

  // Port Render (ou 3000 en local)
  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0');
  console.log(`✅ Server is running on http://localhost:${port}`);
}
bootstrap();
