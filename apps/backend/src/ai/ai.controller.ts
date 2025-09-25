import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { SummaryDto } from './dto/summary.dto';
import { QuizDto } from './dto/quiz.dto';
import { FeedbackDto } from './dto/feedback.dto';

@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService) { }

    @Post('summary')
    getSummary(@Body() dto: SummaryDto) {
        return { summary: this.aiService.generateSummary(dto.text) };
    }

    @Post('quiz')
    getQuiz(@Body() dto: QuizDto) {
        return this.aiService.generateQuiz(dto.text);
    }

    @Post('feedback')
    getFeedback(@Body() dto: FeedbackDto) {
        return { feedback: this.aiService.generateFeedback(dto.text) };
    }
}
