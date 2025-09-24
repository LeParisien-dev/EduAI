import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
} from 'typeorm';
import { Course } from '../courses/course.entity';

@Entity('user') // ✅ nom explicite de la table
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    username!: string;

    @Column()
    passwordHash!: string; // on stocke uniquement le hash

    @OneToMany(() => Course, (course) => course.createdBy)
    courses!: Course[];

    // ✅ Ajout de la date de création automatique
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
