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
                useCategoryAverage
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
            $useCategoryAverage: Boolean!
        ) {
            createQuiz(
                createQuizData: {
                    title: $title
                    description: $description
                    categories: $categories
                    questions: $questions
                    template: $template
                    useCategoryAverage: $useCategoryAverage
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
                template
                categories
                useCategoryAverage
                questions {
                    _id
                    question
                    type
                    categoryIndex
                    answers {
                        _id
                        text
                        isCorrect
                        categoryIndex
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
            $useCategoryAverage: Boolean!
        ) {
            updateQuiz(
                updateQuizData: {
                    id: $id
                    title: $title
                    description: $description
                    categories: $categories
                    questions: $questions
                    useCategoryAverage: $useCategoryAverage
                }
            ) {
                _id
            }
        }
    `,
}
