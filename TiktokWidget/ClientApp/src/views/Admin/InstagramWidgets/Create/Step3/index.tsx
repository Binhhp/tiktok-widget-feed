import React from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import { FlexboxDiv, InstagramWidgetWrapper } from "../CreateWidgetStyle";
import MediaCardGuides from "../MediaCardGuides";
import {
  DivText,
  Step3Caption,
  Step3Content,
  Step3Wrapper,
} from "./Step3Style";

function Step3() {
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);
  return (
    <InstagramWidgetWrapper>
      <FlexboxDiv>
        <Step3Wrapper>
          <Step3Caption>How to add the widget to your website</Step3Caption>
          <Step3Content>
            <DivText>
              From your Shopify admin, go to Online Store &gt; <br />
              Themes. <br />
              Find the theme that you want to edit, and then click Customize.
            </DivText>
            <a
              href={`https://${shopReducer.shop.domain}/admin/themes/current/editor`}
              target="_blank"
              rel="noreferrer"
            >
              Customize
            </a>
          </Step3Content>
        </Step3Wrapper>
        <MediaCardGuides></MediaCardGuides>
      </FlexboxDiv>
      <Step3Wrapper></Step3Wrapper>
    </InstagramWidgetWrapper>
  );
}

export default Step3;
