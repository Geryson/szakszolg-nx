import { IApiResource } from './api-resource.interface'

export interface IQuizAnswerOption extends IApiResource {
    text: string
    isCorrect?: boolean
    categoryIndex?: number
}
