import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Quiz, QuizDocument } from './quiz.entity'
import { Model } from 'mongoose'
import { UpdateQuizInput } from '../dto/inputs/update-quiz.input'
import { CreateQuizInput } from '../dto/inputs/create-quiz.input'
import { GetQuizzesArgs } from '../dto/args/get-quizzes.args'
import { GetQuizArgs } from '../dto/args/get-quiz.args'
import { IQuiz } from '@szakszolg-nx/api-interfaces'
import { DeleteQuizInput } from '../dto/inputs/delete-quiz.input'
import { SimpleRepository } from '../../../shared/proxies/simple.repository'

@Injectable()
export class QuizRepository extends SimpleRepository<
    QuizDocument,
    IQuiz,
    GetQuizArgs,
    GetQuizzesArgs,
    CreateQuizInput,
    UpdateQuizInput,
    DeleteQuizInput
> {
    constructor(@InjectModel(Quiz.name) resourceModel: Model<QuizDocument>) {
        super(resourceModel)
    }

    override async findAll(data: GetQuizzesArgs | null): Promise<IQuiz[]> {
        if (!data.category) return super.findAll(data) // No filtering

        return this.model.find({ categories: { $regex: data.category, $options: 'i' } }).exec()
    }
}
