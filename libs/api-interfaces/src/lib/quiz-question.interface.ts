import { IApiResource } from './api-resource.interface'

export interface IQuizQuestion extends IApiResource {
    question: string
    type: string
    answers?: string[]
    correctAnswers?: string[]
}
