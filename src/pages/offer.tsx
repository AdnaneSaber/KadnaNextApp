import React from "react";
import { NextPage, GetStaticProps } from "next";
import { useQuery, gql } from "@apollo/client";
import { SEO } from "components/seo";
import CartPopUp from "features/carts/cart-popup";
import { Modal } from "@redq/reuse-modal";

import {
  OfferPageWrapper,
  ProductsRow,
  MainContentArea,
  ProductsCol,
} from "assets/styles/pages.style";
import GiftCard from "components/gift-card/gift-card";
import Footer from "layouts/footer";
import { initializeApollo } from "utils/apollo";
import dynamic from "next/dynamic";
const ErrorMessage = dynamic(
  () => import("components/custom-message/error-message")
);

const GET_COUPON = gql`
  query {
    offer {
      id
      title
      percentageDiscount
      image
    }
  }
`;
type GiftCardProps = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const GiftCardPage: NextPage<GiftCardProps> = ({ deviceType }) => {
  const { data, error } = useQuery(GET_COUPON);
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <Modal>
      <SEO title="Offer - PickBazar" description="Offer Details" />
      <OfferPageWrapper>
        <MainContentArea>
          <div style={{ width: "100%" }}>
            <ProductsRow>
              {data && data.offer
                ? data.offer.map((coupon) => (
                    <ProductsCol key={coupon.id}>
                      <GiftCard
                        image={coupon.image}
                        percentageDiscount={coupon.percentageDiscount}
                        code={coupon.title}
                      />
                    </ProductsCol>
                  ))
                : null}
            </ProductsRow>
          </div>
        </MainContentArea>

        <Footer />
      </OfferPageWrapper>
      <CartPopUp deviceType={deviceType} />
    </Modal>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_COUPON,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
export default GiftCardPage;
