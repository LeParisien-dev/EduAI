import { IsString, MinLength } from 'class-validator';

export class FeedbackDto {
    @IsString()
    @MinLength(5, { message: 'Le texte doit contenir au moins 5 caractères.' })
    text!: string;
}
