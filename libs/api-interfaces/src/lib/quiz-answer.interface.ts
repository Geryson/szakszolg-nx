import { IApiResource } from './api-resource.interface'

export interface IQuizAnswer extends IApiResource {
    quizId: string
    questionId: number
    answer: string
    om: string
    isCorrect?: boolean | null
    token?: string | null
    answeredAt?: Date
}
