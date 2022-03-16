import { Injectable } from '@nestjs/common'
import { CreateQuizInput } from './dto/inputs/create-quiz.input'
import { UpdateQuizInput } from './dto/inputs/update-quiz.input'
import { QuizRepository } from './entities/quiz.repository'
import { GetQuizzesArgs } from './dto/args/get-quizzes.args'
import { GetQuizArgs } from './dto/args/get-quiz.args'
import { DeleteQuizInput } from './dto/inputs/delete-quiz.input'
import { RepositoryProxyService } from '../../shared/proxies/repository-proxy.service'
import { IQuiz } from '@szakszolg-nx/api-interfaces'

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

    async findOne(data: GetQuizArgs): Promise<any> {
        const res: IQuiz = await super.findOne(data)
        res.questions = res.questions.map((question, index) => {
            if (!question._id) question._id = index
            return question
        })
        return res
    }
}
