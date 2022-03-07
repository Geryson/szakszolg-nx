import { gql } from 'apollo-angular'

export const PROFILE = {
    READ: gql`
        query getProfile($email: String!) {
            user(email: $email) {
                _id
                email
                username
                roles {
                    _id
                    name
                    description
                    permissions
                }
            }
        }
    `,
}
