import { gql } from "@apollo/client";

export const GET_VERIFIED = gql`
  mutation verify($token: String!) {
    verifyAccount(token: $token) {
      success
      errors
    }
  }
`;
