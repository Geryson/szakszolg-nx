import { Module } from '@nestjs/common'
import { QuizAnswerService } from './quiz-answer.service'
import { QuizAnswerResolver } from './quiz-answer.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { QuizAnswer, QuizAnswerSchema } from './entities/quiz-answer.entity'
import { QuizAnswerRepository } from './entities/quiz-answer.repository'
import { QuizModule } from '../quiz/quiz.module'

@Module({
    imports: [
        QuizModule,
        MongooseModule.forFeature([
            {
                name: QuizAnswer.name,
                schema: QuizAnswerSchema,
            },
        ]),
    ],
    providers: [QuizAnswerResolver, QuizAnswerService, QuizAnswerRepository],
    exports: [QuizAnswerService, QuizAnswerRepository],
})
export class QuizAnswerModule {}
