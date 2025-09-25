import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Validation globale
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // ✅ CORS précis pour ton frontend (localhost:5173)
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });

  // ✅ Force le port 4000
  const port = Number(process.env.PORT) || 4000;
  await app.listen(port, '0.0.0.0');

  // ✅ Log clair
  // eslint-disable-next-line no-console
  console.log(`✅ EduAI API running on http://localhost:${port}`);
}
bootstrap();
