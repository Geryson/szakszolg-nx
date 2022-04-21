import { gql } from 'apollo-angular'

export const GROUPING_ITEMS2 = {
    BROWSE: gql`
        query {
            groupingItems2 {
                _id
                category
                items
                itemIsPicture
                groups
                groupIsPicture
                correct
                correctIsPicture
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
                items
                itemIsPicture
                groups
                groupIsPicture
                correct
                correctIsPicture
            }
        }
    `,

    READ: gql`
        query ($id: String!) {
            groupingItem2(id: $id) {
                _id
                category
                items
                itemIsPicture
                groups
                groupIsPicture
                correct
                correctIsPicture
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
                items
                itemIsPicture
                groups
                groupIsPicture
                correct
                correctIsPicture
                createdAt
                updatedAt
                deletedAt
            }
        }
    `,

    EDIT: gql`
        mutation ($id: String!, $category: String, $items: [String!], $itemIsPicture: [Boolean!], $groups: [String], $groupIsPicture: [Boolean!], $correct: [String!], $correctIsPicture: [Boolean!]) {
            updateGroupingItem2(updateGroupingItem2Data: { id: $id, category: $category, items: $items, itemIsPicture: $itemIsPicture, groups: $groups, groupIsPicture: $groupIsPicture, correct: $correct, correctIsPicture: $correctIsPicture }) {
                _id
                category
                items
                itemIsPicture
                groups
                groupIsPicture
                correct
                correctIsPicture
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
                items
                groups
                correct
                createdAt
                updatedAt
                deletedAt
            }
        }
    `,
    ADD: gql`
        mutation ($items: [String!]!, $itemIsPicture: [Boolean!]!, $category: String! $groups: [String!]!, $groupIsPicture: [Boolean!]!, $correct: [String!]!, $correctIsPicture: [Boolean!]!,) {
            createGroupingItem2(createGroupingItem2Data: { items: $items, itemIsPicture: $itemIsPicture, category: $category, groups: $groups, groupIsPicture: $groupIsPicture, correct: $correct, correctIsPicture: $correctIsPicture }) {
                _id
                category
                items
                itemIsPicture
                groups
                groupIsPicture
                correct
                correctIsPicture
                createdAt
                updatedAt
                deletedAt
            }
        }
    `,
}
