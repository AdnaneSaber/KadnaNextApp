import React, { useRef, useState, useEffect } from "react";
import { Img } from "react-image";
import {
  GiftCardWrapper,
  GiftCardImageWrapper,
  CardInfo,
  CardContent,
  GiftCode,
  Discount
} from "./gift-card.style";

type GiftCardProps = {
  image?: any;
  percentageDiscount?: any;
  weight?: string;
  code?: any;
  onClick?: (e: any) => void;
  onChange?: (e: any) => void;
};

const GiftCard: React.FC<GiftCardProps> = ({
  image,
  weight,
  onClick,
  onChange,
  code,
  percentageDiscount,
  ...props
}) => {
  const codeRef = useRef(null);
  return (
    <GiftCardWrapper {...props} className="product-card">
      <GiftCardImageWrapper>
        <img src={"http://127.0.0.1:8000/" + image} alt={code+" - Kanda"}  />
      </GiftCardImageWrapper>
      {percentageDiscount ? <Discount>{percentageDiscount}%</Discount> : null}
      <CardInfo>
        <CardContent>
          <GiftCode ref={codeRef} value={code} readOnly />
        </CardContent>
      </CardInfo>
    </GiftCardWrapper>
  );
};

export default GiftCard;
