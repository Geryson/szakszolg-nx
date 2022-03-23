import { Injectable } from '@nestjs/common'
import { CreateQuizAnswerInput } from './dto/inputs/create-quiz-answer.input'
import { UpdateQuizAnswerInput } from './dto/inputs/update-quiz-answer.input'
import { QuizAnswerRepository } from './entities/quiz-answer.repository'
import { GetQuizAnswersArgs } from './dto/args/get-quiz-answers.args'
import { GetQuizAnswerArgs } from './dto/args/get-quiz-answer.args'
import { DeleteQuizAnswerInput } from './dto/inputs/delete-quiz-answer.input'
import { RepositoryProxyService } from '../../shared/proxies/repository-proxy.service'
import { CreateManyQuizAnswersInput } from './dto/inputs/create-many-quiz-answers.input'

@Injectable()
export class QuizAnswerService extends RepositoryProxyService<
    QuizAnswerRepository,
    GetQuizAnswerArgs,
    GetQuizAnswersArgs,
    CreateQuizAnswerInput,
    UpdateQuizAnswerInput,
    DeleteQuizAnswerInput
> {
    constructor(repository: QuizAnswerRepository) {
        super(repository)
    }

    createMany(data: CreateManyQuizAnswersInput) {
        return Promise.all(data.answers.map((item) => this.repository.create(item)))
    }
}
