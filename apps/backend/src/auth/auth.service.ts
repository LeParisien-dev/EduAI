import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    // --- REGISTER ---
    async register(data: RegisterDto): Promise<Omit<User, 'passwordHash'>> {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.usersService.create({
            email: data.email,
            username: data.username,
            passwordHash: hashedPassword,
        });

        const { passwordHash, ...result } = user;
        return result;
    }

    // --- VALIDATION (LOGIN) ---
    async validateUser(data: LoginDto): Promise<User> {
        const user = await this.usersService.findByEmail(data.email);
        if (!user) {
            throw new UnauthorizedException('Utilisateur introuvable');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Mot de passe incorrect');
        }

        return user;
    }

    // --- JWT ---
    async login(user: User) {
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
