import { IApiResource } from './api-resource.interface'
import { IQuizQuestion } from './quiz-question.interface'

export interface IQuiz extends IApiResource {
    title: string
    categories: string[]
    description: string
    questions: IQuizQuestion[]
    tokens: string[]
}
