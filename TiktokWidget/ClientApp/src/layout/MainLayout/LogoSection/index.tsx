import { Icon } from "@shopify/polaris";
import {
  MobileCancelMajor,
  MobileHamburgerMajor,
} from "@shopify/polaris-icons";
import ShopifyLogo from "assets/svg/ShopifyIcon";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationActionTS } from "stores/Admin/Application/action";
import { RootReducer } from "stores/Admin/reducers";
import {
  BackToShop,
  LogoWrapper,
  LogoSectionContext,
  MobileViewMenu,
} from "./LogoSection";

const LogoSection = () => {
  const dispatch = useDispatch();
  const appReducer = useSelector((state: RootReducer) => state.appReducer);
  const shopReducer = useSelector((state: RootReducer) => state.shopReducer);
  const onMobileView = () => {
    dispatch(
      ApplicationActionTS.OnHandleMenuItemMobile(!appReducer.mobileMenuView)
    );
  };
  return (
    <LogoSectionContext>
      <MobileViewMenu onClick={onMobileView}>
        <Icon
          source={
            appReducer.mobileMenuView ? MobileCancelMajor : MobileHamburgerMajor
          }
          color="base"
        />
      </MobileViewMenu>
      <LogoWrapper href={`https://${shopReducer.shop.domain}/admin`}>
        <ShopifyLogo />
        <BackToShop>Back to Shopify</BackToShop>
      </LogoWrapper>
    </LogoSectionContext>
  );
};

export default LogoSection;
