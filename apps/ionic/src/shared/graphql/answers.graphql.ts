import { gql } from 'apollo-angular'

export const ANSWERS = {
    ADD: gql`
        mutation ($answer: String!, $quizId: String!, $questionId: Int!, $answeredAt: DateTime!, $om: String!) {
            createQuizAnswer(
                createQuizAnswerData: {
                    answer: $answer
                    om: $om
                    quizId: $quizId
                    questionId: $questionId
                    answeredAt: $answeredAt
                }
            ) {
                _id
            }
        }
    `,
}
