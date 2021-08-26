import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import { openModal, Modal } from "@redq/reuse-modal";
import { AuthContext } from "contexts/auth/auth.context";
import AuthenticationForm from "features/authentication-form";
import { RightMenu } from "./menu/right-menu/right-menu";
import { LeftMenu } from "./menu/left-menu/left-menu";
import HeaderWrapper from "./header.style";
import LogoImage from "assets/images/logo.svg";
import { isCategoryPage } from "../is-home-page";
import Search from "features/search/search";
import { useQuery } from "@apollo/client";
import { GET_LOGGED_IN_CUSTOMER } from "graphql/query/customer.query";
type Props = {
  className?: string;
};

const Header: React.FC<Props> = ({ className }) => {
  const [dataSet, setDataSet] = useState({});
  const { data, error, loading } = useQuery(GET_LOGGED_IN_CUSTOMER, {
    onCompleted: () => {
      setDataSet(data.me);
      console.log(data.me)
    },
  });
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext<any>(AuthContext);
  const { pathname, query } = useRouter();
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
    authDispatch({ type: "SIGN_OUT" });
    window.location.href = "/";
  };

  const handleJoin = () => {
    authDispatch({
      type: "SIGNIN",
    });

    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };
  const showSearch = isCategoryPage(query.type) || pathname === "/";
  return (
    <HeaderWrapper className={className} id="layout-header">
      <LeftMenu logo={LogoImage} />
      {showSearch && <Search minimal={true} className="headerSearch" />}
      <RightMenu
        isAuthenticated={isAuthenticated}
        onJoin={handleJoin}
        onLogout={handleLogout}
        avatar={data && data.me && data.me.image}
      />
    </HeaderWrapper>
  );
};

export default Header;
