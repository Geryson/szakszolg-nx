import { gql } from 'apollo-angular'

export const SURVEYS = {
    BROWSE: gql`
        query {
            quizzes {
                _id
                title
                description
                categories
                createdAt
            }
        }
    `,

    DESTROY: gql`
        mutation ($id: String!) {
            deleteQuiz(deleteQuizData: { id: $id }) {
                _id
            }
        }
    `,
}
