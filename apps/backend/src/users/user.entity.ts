import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string; // email doit toujours être unique

    @Column()
    username!: string;

    @Column()
    passwordHash!: string; // on stocke uniquement le hash du mot de passe
}
