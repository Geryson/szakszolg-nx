import { gql } from 'apollo-angular'

export const GROUPING_ITEMS2 = {
    BROWSE: gql`
        query {
            groupingItem2 {
                _id
                category
                item
                groups
                correct
                createdAt
                updatedAt
                deletedAt
            }
        }
    `,

    BROWSE_BY_CATEGORY: gql`
        query ($category: String!) {
            groupingItem2 (category: $category) {
                category
                item
                groups
                correct
            }
        }
    `,

    READ: gql`
        query ($id: String!) {
            groupingItem2(id: $id) {
                _id
                category
                item
                groups
                correct
                createdAt
                updatedAt
                deletedAt
            }
        }
    `,

    RANDOM: gql`
        query {
            groupingItem2 {
                _id
                category
                item
                groups
                correct
                createdAt
                updatedAt
                deletedAt
            }
        }
    `,

    EDIT: gql`
        mutation ($id: String!, $item: String, $groups: [String], $correct: String) {
            updateGroupingItem2(updateGroupingItem2Data: { id: $id, category: $category, item: $item, groups: $groups, correct: $correct }) {
                _id
                category
                item
                groups
                correct
                createdAt
                updatedAt
                deletedAt
            }
        }
    `,

    DESTROY: gql`
        mutation ($id: String!) {
            deleteGroupingItem2(deleteGroupingItem2Data: { id: $id }) {
                _id
                category
                item
                groups
                correct
                createdAt
                updatedAt
                deletedAt
            }
        }
    `,
    ADD: gql`
        mutation ($items: [String!]!, $category: String! $groups: [String!]!, $correct: [String!]!) {
            createGroupingItem2(createGroupingItem2Data: { items: $items, category: $category, groups: $groups, correct: $correct }) {
                _id
                category
                items
                groups
                correct
                createdAt
                updatedAt
                deletedAt
            }
        }
    `,
}
