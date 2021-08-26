import { gql } from "@apollo/client";

export const UPDATE_ADDRESS = gql`
  mutation updateAddress($id: ID!, $address: String, $title: String) {
    updateAddress(id: $id, desc: $address, title: $title) {
      address {
        id
        title
        address
        type
        user {
          id
        }
      }
    }
  }
`;
export const DELETE_ADDRESS = gql`
  mutation($addressId: String!) {
    deleteAddress(addressId: $addressId) {
      address {
        id
      }
    }
  }
`;
