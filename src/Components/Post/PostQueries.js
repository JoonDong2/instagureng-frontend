import { gql } from "apollo-boost";

export const TOGGLE_LIKE = gql`
    mutation toggleLike($postId: Int!) {
        toggleLike(postId: $postId) {
            id
        }
    }
`;

export const ADD_COMMENT = gql`
    mutation addComment($postId: Int!, $text: String!) {
        addComment(postId: $postId, text: $text) {
            id
            text
            user {
                userName
                fullName
                firstName
            }
        }
    }
`;