import { Injectable } from '@nestjs/common'
import { CreateQuizAnswerOptionInput } from './dto/inputs/create-quiz-answer-option.input'
import { UpdateQuizAnswerOptionInput } from './dto/inputs/update-quiz-answer-option.input'
import { QuizAnswerOptionRepository } from './entities/quiz-answer-option.repository'
import { GetQuizAnswerOptionsArgs } from './dto/args/get-quiz-answer-options.args'
import { GetQuizAnswerOptionArgs } from './dto/args/get-quiz-answer-option.args'
import { DeleteQuizAnswerOptionInput } from './dto/inputs/delete-quiz-answer-option.input'
import { RepositoryProxyService } from '../../shared/proxies/repository-proxy.service'

@Injectable()
export class QuizAnswerOptionService extends RepositoryProxyService<
    QuizAnswerOptionRepository,
    GetQuizAnswerOptionArgs,
    GetQuizAnswerOptionsArgs,
    CreateQuizAnswerOptionInput,
    UpdateQuizAnswerOptionInput,
    DeleteQuizAnswerOptionInput
> {
    constructor(repository: QuizAnswerOptionRepository) {
        super(repository)
    }
}
