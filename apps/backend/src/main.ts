// apps/backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port, '0.0.0.0'); // ✅ Render a besoin de 0.0.0.0
}
bootstrap();
