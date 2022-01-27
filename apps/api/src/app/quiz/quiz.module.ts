import { Module } from '@nestjs/common'
import { QuizService } from './quiz.service'
import { QuizResolver } from './quiz.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Quiz, QuizSchema } from './entities/quiz.entity'
import { QuizRepository } from './entities/quiz.repository'
import { QuizQuestion, QuizQuestionSchema } from '../quiz-question/entities/quiz-question.entity'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: QuizQuestion.name,
                schema: QuizQuestionSchema,
            },
            {
                name: Quiz.name,
                schema: QuizSchema,
            },
        ]),
    ],
    providers: [QuizResolver, QuizService, QuizRepository],
    exports: [QuizService, QuizRepository],
})
export class QuizModule {}
