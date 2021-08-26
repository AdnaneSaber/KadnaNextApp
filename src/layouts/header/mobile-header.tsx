import React, { useState } from "react";
import { useRouter } from "next/router";
import { openModal, closeModal } from "@redq/reuse-modal";
import MobileDrawer from "./mobile-drawer";
import {
  MobileHeaderWrapper,
  MobileHeaderInnerWrapper,
  DrawerWrapper,
  LogoWrapper,
  SearchWrapper,
  SearchModalWrapper,
  SearchModalClose,
} from "./header.style";
import Search from "features/search/search";
import LogoImage from "assets/images/logo.svg";

import { SearchIcon } from "assets/icons/SearchIcon";
import { LongArrowLeft } from "assets/icons/LongArrowLeft";
import Logo from "layouts/logo/logo";
import LanguageSwitcher from "./menu/language-switcher/language-switcher";
import { isCategoryPage } from "../is-home-page";
import useDimensions from "utils/useComponentSize";
import { useQuery } from "@apollo/client";
import { GET_LOGGED_IN_CUSTOMER } from "graphql/query/customer.query";
import ErrorMessage from "components/custom-message/error-message";

type MobileHeaderProps = {
  className?: string;
  closeSearch?: any;
  me?: any;
};

const SearchModal: React.FC<{}> = () => {
  const onSubmit = () => {
    closeModal();
  };
  return (
    <SearchModalWrapper>
      <SearchModalClose type="submit" onClick={() => closeModal()}>
        <LongArrowLeft />
      </SearchModalClose>
      <Search
        className="header-modal-search"
        showButtonText={false}
        onSubmit={onSubmit}
      />
    </SearchModalWrapper>
  );
};

const MobileHeader: React.FC<MobileHeaderProps> = ({ className }) => {
  const [dataSet, setDataSet] = useState({});
  const { data, error, loading } = useQuery(GET_LOGGED_IN_CUSTOMER, {
    onCompleted: () => {
      setDataSet(data.me);
    },
  });
  // if (error) return <ErrorMessage message={error.message} />;

  const { pathname, query } = useRouter();

  const [mobileHeaderRef, dimensions] = useDimensions();

  const handleSearchModal = () => {
    openModal({
      show: true,
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "search-modal-mobile",
        width: "100%",
        height: "100%",
      },
      closeOnClickOutside: false,
      component: SearchModal,
      closeComponent: () => <div />,
    });
  };
  const type = pathname === "/restaurant" ? "restaurant" : query.type;

  const isHomePage = isCategoryPage(type);

  return (
    <MobileHeaderWrapper>
      <MobileHeaderInnerWrapper className={className} ref={mobileHeaderRef}>
        <DrawerWrapper>
          <MobileDrawer
            fullName={data && data.me && data.me.fullName}
            contactsSet={data && data.me && data.me.contactsSet}
            image={data && data.me && "http://127.0.0.1:8000/"+data.me.image}
          />
        </DrawerWrapper>
        <LogoWrapper>
          <Logo imageUrl={LogoImage} alt="shop logo" />
        </LogoWrapper>

        <LanguageSwitcher />

        {isHomePage ? (
          <SearchWrapper
            onClick={handleSearchModal}
            className="searchIconWrapper"
          >
            <SearchIcon />
          </SearchWrapper>
        ) : null}
      </MobileHeaderInnerWrapper>
    </MobileHeaderWrapper>
  );
};

export default MobileHeader;
