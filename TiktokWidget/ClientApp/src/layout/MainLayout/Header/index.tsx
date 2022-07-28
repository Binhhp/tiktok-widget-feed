import { Icon } from "@shopify/polaris";
import { FlagMajor } from "@shopify/polaris-icons";
import { FlexBox } from "common/style/Utils.style";
import React from "react";
import LogoSection from "../LogoSection";
import {
  Account,
  AccountName,
  FlagStyle,
  FlagText,
  HeaderWrapper,
} from "./HeaderStyle";
import Avatar from "react-avatar";
import { RootReducer } from "stores/reducers";
import { useSelector } from "react-redux";

function Header() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.widgetReducer
  );
  const buttonWidgetReducer = useSelector(
    (state: RootReducer) => state.buttonWidgetReducer
  );
  const shopReducer = useSelector((state: RootReducer) => state.shopReducer);

  return (
    <HeaderWrapper>
      <LogoSection></LogoSection>
      <FlexBox>
        {window.location.pathname.includes("create-widget") &&
        widgetReducer.count === 0 &&
        widgetReducer.step ? (
          <FlexBox>
            <FlagStyle>
              <Icon source={FlagMajor} color="highlight" />
            </FlagStyle>
            <FlagText>Getting Started: {widgetReducer.step}/3</FlagText>
          </FlexBox>
        ) : buttonWidgetReducer.step && !buttonWidgetReducer.id ? (
          <FlexBox>
            <FlagStyle>
              <Icon source={FlagMajor} color="highlight" />
            </FlagStyle>
            <FlagText>Setup guide: {buttonWidgetReducer.step}/3</FlagText>
          </FlexBox>
        ) : (
          ""
        )}
        <Account>
          <Avatar
            round={true}
            size="30"
            name={shopReducer.shop.domain}
          ></Avatar>
          <AccountName>{shopReducer.shop.domain}</AccountName>
        </Account>
      </FlexBox>
    </HeaderWrapper>
  );
}

export default Header;
