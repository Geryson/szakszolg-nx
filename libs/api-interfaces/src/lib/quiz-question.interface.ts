import { IApiResource } from './api-resource.interface'
import { IQuizAnswerOption } from './quiz-answer-option.interface'

export interface IQuizQuestion extends IApiResource {
    question: string
    type: string
    categoryIndex?: number
    answers?: IQuizAnswerOption[]
}
