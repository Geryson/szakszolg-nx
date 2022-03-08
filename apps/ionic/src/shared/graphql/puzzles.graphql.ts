import { gql } from 'apollo-angular'

export const PUZZLES = {
    BROWSE: gql`
        query {
            puzzles {
                _id
                url
                createdAt
            }
        }
    `,

    READ: gql`
        query puzzle($id: String!) {
            puzzle(id: $id) {
                _id
                url
                columns
                createdAt
                cropLeft
                cropTop
                cropHeight
                cropWidth
                pieceSize
            }
        }
    `,

    ADD: gql`
        mutation (
            $url: String!
            $columns: Float!
            $cropLeft: Float!
            $cropTop: Float!
            $cropHeight: Float!
            $cropWidth: Float!
            $pieceSize: Float!
        ) {
            createPuzzle(
                createPuzzleData: {
                    url: $url
                    columns: $columns
                    cropLeft: $cropLeft
                    cropTop: $cropTop
                    cropHeight: $cropHeight
                    cropWidth: $cropWidth
                    pieceSize: $pieceSize
                }
            ) {
                _id
                url
                columns
                createdAt
                cropLeft
                cropTop
                cropHeight
                cropWidth
                pieceSize
            }
        }
    `,

    DESTROY: gql`
        mutation ($id: String!) {
            deletePuzzle(deletePuzzleData: { id: $id }) {
                _id
            }
        }
    `,
}
