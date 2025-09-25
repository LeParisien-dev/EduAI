import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
} from 'typeorm';
import { Course } from '../courses/course.entity';

@Entity('user')
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

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
