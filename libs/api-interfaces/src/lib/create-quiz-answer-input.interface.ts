
export interface ICreateQuizAnswerInput {
    quizId: string
    token?: string | null
    questionId: number
    answer: string
    om: string
    answeredAt?: Date
    isCorrect?: boolean | null
}
