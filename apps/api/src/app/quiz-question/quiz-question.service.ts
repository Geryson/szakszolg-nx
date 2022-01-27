import { Injectable } from '@nestjs/common'
import { CreateQuizQuestionInput } from './dto/inputs/create-quiz-question.input'
import { UpdateQuizQuestionInput } from './dto/inputs/update-quiz-question.input'
import { QuizQuestionRepository } from './entities/quiz-question.repository'
import { GetQuizQuestionsArgs } from './dto/args/get-quiz-questions.args'
import { GetQuizQuestionArgs } from './dto/args/get-quiz-question.args'
import { DeleteQuizQuestionInput } from './dto/inputs/delete-quiz-question.input'
import { RepositoryProxyService } from '../../shared/proxies/repository-proxy.service'

@Injectable()
export class QuizQuestionService extends RepositoryProxyService<
    QuizQuestionRepository,
    GetQuizQuestionArgs,
    GetQuizQuestionsArgs,
    CreateQuizQuestionInput,
    UpdateQuizQuestionInput,
    DeleteQuizQuestionInput
> {
    constructor(repository: QuizQuestionRepository) {
        super(repository)
    }
}
