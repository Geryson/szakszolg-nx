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

    ADD: gql`
        mutation (
            $title: String!
            $description: String!
            $categories: [String!]!
            $questions: [CreateQuizQuestionInput!]!
            $template: String!
        ) {
            createQuiz(
                createQuizData: {
                    title: $title
                    description: $description
                    categories: $categories
                    questions: $questions
                    template: $template
                }
            ) {
                _id
            }
        }
    `,
    READ: gql`
        query ($id: String!) {
            quiz(id: $id) {
                _id
                title
                description
                categories
                questions {
                    question
                    type
                    answers {
                        text
                    }
                }
                createdAt
            }
        }
    `,

    CATEGORIES: gql`
        query {
            quizzes {
                categories
            }
        }
    `,

    EDIT: gql`
        mutation (
            $id: String!
            $title: String!
            $description: String!
            $categories: [String!]
            $questions: [UpdateQuizQuestionInput!]
        ) {
            updateQuiz(
                updateQuizData: {
                    id: $id
                    title: $title
                    description: $description
                    categories: $categories
                    questions: $questions
                }
            ) {
                _id
            }
        }
    `,
}
