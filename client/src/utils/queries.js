import {
    gql
} from '@apollo/client';

export const GET_ME = gql`
    query getMe($username: String!) {
        getMe(username: $username) {
            _id
            username
            email
            password
            savedBooks {
                bookId
                authors
                description
                image
                link
                title
            }
        }
    }
`