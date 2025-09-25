import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
    ) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepo.findOne({ where: { email } });
    }

    async create(data: { email: string; username: string; passwordHash: string }): Promise<User> {
        console.log('👉 Tentative d’insertion utilisateur:', data);

        const user = this.usersRepo.create(data);
        return await this.usersRepo.save(user);
    }
}
