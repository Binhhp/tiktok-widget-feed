import { Icon } from "@shopify/polaris";
import { FlagMajor } from "@shopify/polaris-icons";
import { FlexBox } from "common/style/UtilStyles";
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
import { RootReducer } from "stores/Admin/reducers";
import { useSelector } from "react-redux";

function Header() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.TiktokWidgetReducer
  );

  const instagramWidgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );

  const buttonWidgetReducer = useSelector(
    (state: RootReducer) => state.ButtonWidgetReducer
  );
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);

  const showGettingStart = () => {
    if (window.location.pathname.includes("create-widget")) {
      if (
        widgetReducer.status === "FirstCreated" ||
        widgetReducer.count === 0
      ) {
        return widgetReducer.step > 0 ? widgetReducer.step : 0;
      }
    } else if (window.location.pathname.includes("instagram-step")) {
      if (
        instagramWidgetReducer.status === "FirstCreated" ||
        instagramWidgetReducer.count === 0
      ) {
        return instagramWidgetReducer.step > 0
          ? instagramWidgetReducer.step
          : 0;
      }
    }
    return undefined;
  };
  return (
    <HeaderWrapper>
      <LogoSection></LogoSection>
      <FlexBox>
        {showGettingStart() ? (
          <FlexBox>
            <FlagStyle>
              <Icon source={FlagMajor} color="highlight" />
            </FlagStyle>
            <FlagText>Getting Started: {showGettingStart()}/3</FlagText>
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
        <AvatarDisplay
          name={
            shopReducer.shop?.shopDescriptor?.shopOwner ??
            shopReducer.shop?.domain
          }
        />
      </FlexBox>
    </HeaderWrapper>
  );
}

const AvatarDisplay = React.memo(({ name }: any) => {
  return (
    <Account>
      <Avatar round={true} size="30" name={name}></Avatar>
      <AccountName>{name}</AccountName>
    </Account>
  );
});
export default React.memo(Header);
