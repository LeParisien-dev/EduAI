import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        const user = await this.authService.validateUser(dto);
        return this.authService.login(user);
    }

    // Route protégée
    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Request() req: ExpressRequest) {
        return req.user; // typiquement { sub, email }
    }
}
