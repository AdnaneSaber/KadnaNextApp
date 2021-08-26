import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query getCategories($type: String!) {
    categories(categoryType: $type) {
      id
      title
      slug
      image
    }
  }
`;
