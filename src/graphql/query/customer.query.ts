import { gql } from "@apollo/client";

export const GET_LOGGED_IN_CUSTOMER = gql`
  query {
    me {
      username
      verified
      fullName
      email
      image
      addressSet {
        id
        address
        title
        type
      }
      contactsSet {
        id
        number
        type
      }
    }
  }
`;
