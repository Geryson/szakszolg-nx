import { Module } from '@nestjs/common'
import { QuizAnswerOptionService } from './quiz-answer-option.service'
import { QuizAnswerOptionResolver } from './quiz-answer-option.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { QuizAnswerOption, QuizAnswerOptionSchema } from './entities/quiz-answer-option.entity'
import { QuizAnswerOptionRepository } from './entities/quiz-answer-option.repository'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: QuizAnswerOption.name,
                schema: QuizAnswerOptionSchema,
            },
        ]),
    ],
    providers: [QuizAnswerOptionResolver, QuizAnswerOptionService, QuizAnswerOptionRepository],
    exports: [QuizAnswerOptionService, QuizAnswerOptionRepository],
})
export class QuizAnswerOptionModule {}
