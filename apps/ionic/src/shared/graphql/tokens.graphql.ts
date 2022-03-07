import { gql } from 'apollo-angular'

export const TOKENS = {
    ADD: gql`
        mutation ($quizId: String!) {
            createToken(createTokenData: { quizId: $quizId }) {
                token
            }
        }
    `,
}
