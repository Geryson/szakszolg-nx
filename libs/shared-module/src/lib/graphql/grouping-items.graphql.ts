import { gql } from 'apollo-angular'

export const GROUPING_ITEMS = {
    BROWSE: gql`
        query {
            groupingItems {
                _id
                item
                groups
                correct
                createdAt
                updatedAt
                deletedAt
            }
        }
    `,

    READ: gql`
        query ($id: String!) {
            groupingItem(id: $id) {
                _id
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
            groupingItem {
                _id
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
            updateGroupingItem(updateGroupingItemData: { id: $id, item: $item, groups: $groups, correct: $correct }) {
                _id
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
            deleteGroupingItem(deleteGroupingItemData: { id: $id }) {
                _id
                item
                groups
                correct
                createdAt
                updatedAt
                deletedAt
            }
        }
    `,
}
