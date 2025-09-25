import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Course {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column({ nullable: true })
    description!: string;

    @Column({ default: 'draft' })
    status!: 'draft' | 'published';

    @Column({ name: 'createdById', type: 'uuid' })
    createdById!: string;

    @ManyToOne(() => User, (user) => user.courses, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'createdById' })
    createdBy!: User;

    // Timestamps automatiques
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
