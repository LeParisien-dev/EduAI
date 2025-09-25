import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
    generateSummary(text: string): string {
        // Mock résumé
        return `Résumé simulé : ${text.slice(0, 50)}... (suite générée par AI mock)`;
    }

    generateQuiz(text: string): any {
        // Mock quiz : 2 questions fixes
        return {
            questions: [
                {
                    q: `Question simulée sur "${text.slice(0, 30)}..." ?`,
                    options: ['A', 'B', 'C', 'D'],
                    answer: 'A',
                },
                {
                    q: `Autre question générée aléatoirement.`,
                    options: ['Vrai', 'Faux'],
                    answer: 'Vrai',
                },
            ],
        };
    }

    generateFeedback(text: string): string {
        // Mock feedback aléatoire
        const feedbacks = [
            'Très bon travail, continue comme ça !',
            'Attention, essaie de mieux structurer tes idées.',
            'Excellent sur le fond, améliore la clarté de la forme.',
        ];
        return feedbacks[Math.floor(Math.random() * feedbacks.length)];
    }
}
