import { gql } from "apollo-boost";

export const SEARCH = gql`
    query search($term: String!) {
        searchPost(term: $term) {
            id
            files {
                url
            }
            likesCount
            commentsCount
        }
        searchUser(term: $term) {
            id
            userName
            fullName
            firstName
            avatar
            isFollowing
            isSelf
        }
    }
`;