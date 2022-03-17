import { IApiResource } from './api-resource.interface'

export interface IQuizAnswer extends IApiResource {
    quizId: string
    questionId: number
    answer: string
    om: string
    token?: string | null
    isCorrect?: boolean | null
    answeredAt?: Date
}
