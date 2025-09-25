import { IsString, MinLength } from 'class-validator';

export class SummaryDto {
    @IsString()
    @MinLength(10, { message: 'Le texte doit contenir au moins 10 caractères.' })
    text!: string;
}
