import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { QuizAnswerOption, QuizAnswerOptionDocument } from './quiz-answer-option.entity'
import { Model } from 'mongoose'
import { UpdateQuizAnswerOptionInput } from '../dto/inputs/update-quiz-answer-option.input'
import { CreateQuizAnswerOptionInput } from '../dto/inputs/create-quiz-answer-option.input'
import { GetQuizAnswerOptionsArgs } from '../dto/args/get-quiz-answer-options.args'
import { GetQuizAnswerOptionArgs } from '../dto/args/get-quiz-answer-option.args'
import { IQuizAnswerOption } from '@szakszolg-nx/api-interfaces'
import { DeleteQuizAnswerOptionInput } from '../dto/inputs/delete-quiz-answer-option.input'
import { SimpleRepository } from '../../../shared/proxies/simple.repository'

@Injectable()
export class QuizAnswerOptionRepository extends SimpleRepository<
    QuizAnswerOptionDocument,
    IQuizAnswerOption,
    GetQuizAnswerOptionArgs,
    GetQuizAnswerOptionsArgs,
    CreateQuizAnswerOptionInput,
    UpdateQuizAnswerOptionInput,
    DeleteQuizAnswerOptionInput
> {
    constructor(@InjectModel(QuizAnswerOption.name) resourceModel: Model<QuizAnswerOptionDocument>) {
        super(resourceModel)
    }

    // TODO: Check if anything needs to be overridden
}
