import { gql } from "apollo-boost";

export const TOGGLE_FOLLOW = gql`
  mutation toggleFollow($id: Int!) {
    toggleFollow(id: $id) {
      id
    }
  }
`;