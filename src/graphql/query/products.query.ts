import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query getProducts(
    $type: String
    $text: String
    $category: String
    $offset: Int
    $limit: Int
  ) {
    products(
      productType: $type
      text: $text
      category: $category
      offset: $offset
      limit: $limit
    ) {
        id
        title
        slug
        unit
        price
        salePrice
        description
        percentageDiscount
        productType
        image
        quantity
        author {
          id
          username
        }
        category {
          id
          title
          slug
        }
      
      hasMore
    }
  }
`;
