import { gql } from 'apollo-angular'

export const HANGMAN_WORDS = {
    BROWSE: gql`
        query {
            hangmanWords {
                _id
                word
                category
                createdAt
                updatedAt
                deletedAt
            }
        }
    `,

    BROWSE_BY_CATEGORY: gql`
    query ($category: String!) {
    hangmanWord (category: $category) {
        word
    }
}
    `,

    EDIT: gql`
        mutation ($id: String!, $word: String, $category: String) {
            updateHangmanWord(updateHangmanWordData: { id: $id, word: $word, category: $category }) {
                _id
                word
                category
            }
        }
    `,

    ADD: gql`
        mutation ($word: String!, $category: String!) {
            createHangmanWord(createHangmanWordData: { word: $word, category: $category }) {
                _id
                word
                category
            }
        }
    `,

    DESTROY: gql`
        mutation ($id: String!) {
            deleteHangmanWord(deleteHangmanWordData: { id: $id }) {
                word
                category
            }
        }
    `,

    READ: gql`
        query ($id: String!) {
            hangmanWord(id: $id) {
                _id
                word
                category
            }
        }
    `,

    BROWSE_CATEGORIES: gql`
        query {
            hangmanWords {
                category
            }
        }
    `,
}
