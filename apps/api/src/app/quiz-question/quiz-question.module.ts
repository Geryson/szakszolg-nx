import { Module } from '@nestjs/common'
import { QuizQuestionService } from './quiz-question.service'
import { QuizQuestionResolver } from './quiz-question.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { QuizQuestion, QuizQuestionSchema } from './entities/quiz-question.entity'
import { QuizQuestionRepository } from './entities/quiz-question.repository'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: QuizQuestion.name,
                schema: QuizQuestionSchema,
            },
        ]),
    ],
    providers: [QuizQuestionResolver, QuizQuestionService, QuizQuestionRepository],
    exports: [QuizQuestionService, QuizQuestionRepository],
})
export class QuizQuestionModule {}
