import {gql} from 'apollo-angular'

export const SCHOOLS = {
    BROWSE: gql`
        query {
            schools {
                _id
                name
                om
                address
                county
                types
            }
        }
    `,

    EDIT: gql`
        mutation ($id: String!, $om: String, $name: String, $address: String, $county: String, $types: [String]) {
            updateSchool(updateSchoolData: { id: $id, om: $om, name: $name, address: $address, county: $county, types: $types }) {
                _id
                om
                name
            }
        }
    `,

    ADD: gql`
        mutation ($om: String!, $name: String!, $address: String!, $county: String!, $types: [String!]!) {
            createSchool(createSchoolData: {om: $om, name: $name, address: $address, county: $county, types: $types}) {
                _id
                om
                name
                address
                county
                types
            }
        }
    `,

    DESTROY: gql`
        mutation ($id: String!) {
            deleteSchool(deleteSchoolData: { id: $id }) {
                om
                name
            }
        }
    `,

    READ: gql`
    query ($om: String, $name: String, $address: String, $county: String, $types: [String]) {
        schools (om: $om, name: $name, address: $address, county: $county, types: $types) {
            _id
            name
            om
            county
            address
            types
        }
    }`
}
