import React from "react";
import Router, { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import Popover from "components/popover/popover";
import Logo from "layouts/logo/logo";
import { MenuDown } from "assets/icons/MenuDown";
// import { CATEGORY_MENU_ITEMS } from 'site-settings/site-navigation';
import * as categoryMenuIcons from "assets/icons/category-menu-icons";
import {
  MainMenu,
  IconWrapper,
  MenuItem,
  SelectedItem,
  Icon,
  Arrow,
  LeftMenuBox,
} from "./left-menu.style";
type Props = {
  logo: string;
};

export const LeftMenu: React.FC<Props> = ({ logo }) => {
  return (
    <LeftMenuBox>
      <MainMenu>
        <Logo imageUrl={logo} alt={"Shop Logo"} />
      </MainMenu>
    </LeftMenuBox>
  );
};
