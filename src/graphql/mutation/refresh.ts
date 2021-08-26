import { gql } from "@apollo/client";

export const REFRESH_TOKEN = gql`
  mutation refresh($token: String!) {
    refreshToken(refreshToken: $token) {
      success
      errors
      payload
      token
      refreshToken
    }
  }
`;
