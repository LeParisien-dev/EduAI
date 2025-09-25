import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';

// ✅ On importe AppController et AppService
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // ✅ Charge les variables depuis apps/backend/.env ou .env racine
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/backend/.env', '.env'],
    }),

    // ✅ Connexion à Neon via DATABASE_URL (pooled)
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: false, // on passe par les migrations
        ssl: true,
        extra: { ssl: { rejectUnauthorized: false } },
        logging: process.env.NODE_ENV !== 'production',
      }),
    }),

    UsersModule,
    AuthModule,
    CoursesModule,
  ],
  controllers: [AppController], // ✅ ajoute ton AppController
  providers: [AppService],      // ✅ ajoute ton AppService
})
export class AppModule { }
