import { gql } from "apollo-boost";

export const GET_USER = gql`
  query seeUser($userName: String!) {
    seeUser(userName: $userName) {
      id
      avatar
      userName
      fullName
      firstName
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likesCount
        commentsCount
      }
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;