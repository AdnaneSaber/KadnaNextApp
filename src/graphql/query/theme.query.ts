import { gql } from "@apollo/client";

export const GET_THEME = gql`
  query {
    theme {
      id
      bannerImage
      HeaderTitle
      HeaderSubTitle
      logo
    }
  }
`;
