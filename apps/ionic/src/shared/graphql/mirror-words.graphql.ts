import { gql } from 'apollo-angular'

export const MIRROR_WORDS = {
    BROWSE: gql`
        query {
            mirrorWords {
                _id
                word
            }
        }
    `,

    RANDOM: gql`
        query {
            mirrorWord {
                _id
                word
            }
        }
    `,

    ADD: gql`
        mutation ($word: String!) {
            createMirrorWord(createMirrorWordData: { word: $word }) {
                _id
                word
            }
        }
    `,

    EDIT: gql`
        mutation ($id: String!, $word: String!) {
            updateMirrorWord(updateMirrorWordData: { id: $id, word: $word }) {
                _id
                word
            }
        }
    `,

    DESTROY: gql`
        mutation ($id: String!) {
            deleteMirrorWord(deleteMirrorWordData: { id: $id }) {
                word
            }
        }
    `,
}
