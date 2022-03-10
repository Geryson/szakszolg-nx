import { gql } from 'apollo-angular'

export const TOKENS = {
    ADD: gql`
        mutation ($quizId: String!) {
            createToken(createTokenData: { quizId: $quizId }) {
                token
            }
        }
    `,

    READ: gql`
        query ($token: String!){
            token(token: $token) {
                quiz{
                    _id
                    title
                    template
                    description
                    categories
                    questions{
                        _id
                        question
                        type
                        answers {
                            text
                        }
                    }
                }
            }
        }
    `,
}
