import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { User } from '../users/user.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private coursesRepo: Repository<Course>,
        @InjectRepository(User)
        private usersRepo: Repository<User>,
    ) { }

    async create(
        createDto: CreateCourseDto,
        userPayload: { id: string },
    ): Promise<{ message: string; course: Course }> {
        if (!createDto.title) {
            throw new BadRequestException('Le titre du cours est obligatoire');
        }

        const user = await this.usersRepo.findOneBy({ id: userPayload.id });
        if (!user) {
            throw new NotFoundException('Utilisateur non trouvé');
        }

        const course = this.coursesRepo.create({
            ...createDto,
            createdBy: user,
            createdById: user.id,
            status: 'draft',
        });

        const saved = await this.coursesRepo.save(course);

        return {
            message: 'Cours créé avec succès (brouillon)',
            course: saved,
        };
    }

    // ✅ Nouveau : liste tous les cours (peu importe le statut)
    async findAll(): Promise<Course[]> {
        return this.coursesRepo.find({
            order: { createdAt: 'DESC' },
        });
    }

    async findPublished(): Promise<Course[]> {
        return this.coursesRepo.find({
            where: { status: 'published' },
            order: { createdAt: 'DESC' },
        });
    }

    async publish(id: string): Promise<{ message: string; course: Course }> {
        const course = await this.coursesRepo.findOneBy({ id });

        if (!course) {
            throw new NotFoundException(`Cours avec l’ID ${id} introuvable`);
        }

        course.status = 'published';
        const updated = await this.coursesRepo.save(course);

        return {
            message: 'Cours publié avec succès',
            course: updated,
        };
    }
}
