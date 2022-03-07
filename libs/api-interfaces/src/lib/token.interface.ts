import { IApiResource } from './api-resource.interface'
import { Types } from 'mongoose'
import { IQuiz } from './quiz.interface'

export interface IToken extends IApiResource {
    token: string
    quiz: Types.ObjectId | IQuiz
    expiresAt: Date
}
