import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        UsersModule,
        ConfigModule,         // déjà global dans AppModule, on le garde ici
        PassportModule,       // CHANGEMENT: nécessaire pour AuthGuard('jwt')
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                secret: config.getOrThrow<string>('JWT_SECRET'), // CHANGEMENT
                signOptions: { expiresIn: '1h' },
            }),
        }),
    ],
    providers: [AuthService, JwtStrategy], // CHANGEMENT: on enregistre la stratégie
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
