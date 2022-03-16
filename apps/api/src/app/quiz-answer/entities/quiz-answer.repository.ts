import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { QuizAnswer, QuizAnswerDocument } from './quiz-answer.entity'
import { Model } from 'mongoose'
import { UpdateQuizAnswerInput } from '../dto/inputs/update-quiz-answer.input'
import { CreateQuizAnswerInput } from '../dto/inputs/create-quiz-answer.input'
import { GetQuizAnswersArgs } from '../dto/args/get-quiz-answers.args'
import { GetQuizAnswerArgs } from '../dto/args/get-quiz-answer.args'
import { IQuiz, IQuizAnswer } from '@szakszolg-nx/api-interfaces'
import { DeleteQuizAnswerInput } from '../dto/inputs/delete-quiz-answer.input'
import { SimpleRepository } from '../../../shared/proxies/simple.repository'
import { QuizService } from '../../quiz/quiz.service'

@Injectable()
export class QuizAnswerRepository extends SimpleRepository<
    QuizAnswerDocument,
    IQuizAnswer,
    GetQuizAnswerArgs,
    GetQuizAnswersArgs,
    CreateQuizAnswerInput,
    UpdateQuizAnswerInput,
    DeleteQuizAnswerInput
> {
    constructor(
        @InjectModel(QuizAnswer.name) resourceModel: Model<QuizAnswerDocument>,
        private readonly quizService: QuizService,
    ) {
        super(resourceModel)
    }

    override async findAll(data: GetQuizAnswersArgs | null): Promise<IQuizAnswer[]> {
        if (data.ids?.length > 0) {
            return super.findAll(data)
        }

        return this.model.find({ quizId: data.quizId })
    }

    override async create(data: CreateQuizAnswerInput): Promise<IQuizAnswer> {
        // const originalQuiz: IQuiz = await this.quizService.findOne({ id: data.quizId })
        // if (!originalQuiz) {
        //     throw new NotFoundException(`Quiz with id ${data.quizId} not found`)
        // }
        // const originalQuestion = originalQuiz.questions.find((q) => q._id.toString() === data.questionId)
        // if (!originalQuestion) {
        //     throw new NotFoundException(`Question not found: ${data.quizId}/${data.questionId}`)
        // }
        //
        // if (originalQuiz.template === 'quiz') {
        //     data.isCorrect = originalQuestion.answers.find((a) => a.text === data.answer)?.isCorrect
        // }
        return super.create(data)
    }
}
