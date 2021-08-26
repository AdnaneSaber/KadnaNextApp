import React from "react";
import Router from "next/router";
import { LogoBox, LogoImage } from "./logo.style";
import { useQuery } from "@apollo/client";
import { GET_THEME } from "graphql/query/theme.query";
type LogoProps = {
  imageUrl: string;
  alt: string;
};

const Logo: React.FC<LogoProps> = ({ imageUrl, alt }) => {
  const { data } = useQuery(GET_THEME);

  function onLogoClick() {
    Router.push("/");
  }
  return (
    <LogoBox onClick={onLogoClick}>
      <LogoImage
        src={
          data && data.theme.logo && "http://127.0.0.1:8000/" + data.theme.logo
        }
        alt={data && data.theme.headerTitle}
        title={data && data.theme.headerTitle}
      />
    </LogoBox>
  );
};

export default Logo;
