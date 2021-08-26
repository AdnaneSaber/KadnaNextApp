import { gql } from "@apollo/client";

export const GET_LOGGED = gql`
  mutation getCredentials($username: String, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      success
      errors
      unarchiving
      token
      refreshToken
      unarchiving
      user {
        id
        username
      }
    }
  }
`;
export const CHECK_VERIFIED = gql`
  query checkVerif($id: String!) {
    user(id: $id) {
      username
      verified
    }
  }
`;
