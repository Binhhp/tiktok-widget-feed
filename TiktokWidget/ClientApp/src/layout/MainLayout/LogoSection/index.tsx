import { Icon } from "@shopify/polaris";
import {
  MobileCancelMajor,
  MobileHamburgerMajor,
} from "@shopify/polaris-icons";
import ShopifyLogo from "assets/svg/ShopifyIcon";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationActionTS } from "stores/Application/action";
import { RootReducer } from "stores/reducers";
import {
  BackToShop,
  LogoWrapper,
  LogoSectionContext,
  MobileViewMenu,
} from "./index.style";

const LogoSection = () => {
  const dispatch = useDispatch();
  const appReducer = useSelector((state: RootReducer) => state.appReducer);
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
      <LogoWrapper>
        <ShopifyLogo />
        <BackToShop href="#">Back to Shopify</BackToShop>
      </LogoWrapper>
    </LogoSectionContext>
  );
};

export default LogoSection;
