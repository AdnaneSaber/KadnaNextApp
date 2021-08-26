import { gql } from "@apollo/client";

export const UPDATE_CONTACT = gql`
  mutation updateContact($id: ID!, $type: String!, $number: String!) {
    updateContact(id: $id, type: $type, number: $number) {
      contact {
        id
        type
        number
      }
    }
  }
`;
export const DELETE_CONTACT = gql`
  mutation($contactId: String!) {
    deleteContact(contactId: $contactId) {
      id
      name
      contact {
        id
        type
        number
      }
    }
  }
`;
