import { Injectable } from '@nestjs/common'
import { CreateQuizInput } from './dto/inputs/create-quiz.input'
import { UpdateQuizInput } from './dto/inputs/update-quiz.input'
import { QuizRepository } from './entities/quiz.repository'
import { GetQuizzesArgs } from './dto/args/get-quizzes.args'
import { GetQuizArgs } from './dto/args/get-quiz.args'
import { DeleteQuizInput } from './dto/inputs/delete-quiz.input'
import { RepositoryProxyService } from '../../shared/proxies/repository-proxy.service'

@Injectable()
export class QuizService extends RepositoryProxyService<
    QuizRepository,
    GetQuizArgs,
    GetQuizzesArgs,
    CreateQuizInput,
    UpdateQuizInput,
    DeleteQuizInput
> {
    constructor(repository: QuizRepository) {
        super(repository)
    }
}
