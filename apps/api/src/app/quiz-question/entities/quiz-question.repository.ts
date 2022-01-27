import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { QuizQuestion, QuizQuestionDocument } from './quiz-question.entity'
import { Model } from 'mongoose'
import { UpdateQuizQuestionInput } from '../dto/inputs/update-quiz-question.input'
import { CreateQuizQuestionInput } from '../dto/inputs/create-quiz-question.input'
import { GetQuizQuestionsArgs } from '../dto/args/get-quiz-questions.args'
import { GetQuizQuestionArgs } from '../dto/args/get-quiz-question.args'
import { IQuizQuestion } from '@szakszolg-nx/api-interfaces'
import { DeleteQuizQuestionInput } from '../dto/inputs/delete-quiz-question.input'
import { SimpleRepository } from '../../../shared/proxies/simple.repository'

@Injectable()
export class QuizQuestionRepository extends SimpleRepository<
    QuizQuestionDocument,
    IQuizQuestion,
    GetQuizQuestionArgs,
    GetQuizQuestionsArgs,
    CreateQuizQuestionInput,
    UpdateQuizQuestionInput,
    DeleteQuizQuestionInput
> {
    constructor(@InjectModel(QuizQuestion.name) resourceModel: Model<QuizQuestionDocument>) {
        super(resourceModel)
    }

    // TODO: Check if anything needs to be overridden
}
