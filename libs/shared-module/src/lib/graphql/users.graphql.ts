import { gql } from 'apollo-angular'

export const USERS = {
    BROWSE: gql`
        query {
            users {
                _id
                username
                email
                roles {
                    _id
                    name
                }
                createdAt
                updatedAt
                deletedAt
            }
        }
    `,

    READ: gql`
        query ($id: String!) {
            user(id: $id) {
                _id
                username
                email
                om
                roles {
                    _id
                    name
                    description
                    permissions
                }
            }
        }
    `,

    EDIT: gql`
        mutation (
            $om: String
            $id: String!
            $email: String
            $roles: [String]
            $username: String
            $password: String!
            $newPassword: String
            $newPasswordConfirm: String
        ) {
            updateUser(
                updateUserData: {
                    om: $om
                    id: $id
                    email: $email
                    roles: $roles
                    username: $username
                    password: $password
                    newPassword: $newPassword
                    newPasswordConfirm: $newPasswordConfirm
                }
            ) {
                om
                _id
                email
                username
                roles {
                    _id
                }
            }
        }
    `,
    DESTROY: gql`
        mutation ($id: String!) {
            deleteUser(deleteUserData: { id: $id }) {
                username
                email
                om
                roles {
                    _id
                    name
                    description
                }
            }
        }
    `,
}
