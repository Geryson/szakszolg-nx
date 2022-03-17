import { gql } from 'apollo-angular'

export const ANSWERS = {
    ADD: gql`
        mutation ($answer: String!, $quizId: String!, $questionId: Int!, $answeredAt: DateTime!, $om: String!, $isCorrect : Boolean, $token : String!) {
            createQuizAnswer(
                createQuizAnswerData: {
                    answer: $answer
                    om: $om
                    quizId: $quizId
                    questionId: $questionId
                    answeredAt: $answeredAt
                    isCorrect: $isCorrect
                    token: $token
                }
            ) {
                _id
            }
        }
    `,
    ADD2:gql`
        mutation($answers: [CreateQuizAnswerInput!]!) {
            createManyQuizAnswers(createQuizAnswerData: {answers: $answers}) {_id}
        }
    `
}
