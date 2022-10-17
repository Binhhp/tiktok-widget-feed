import { Button, Pagination } from "@shopify/polaris";
import { ImageStorage } from "assets/images/ImageStorage";
import { ChatPlugin } from "common/functions/ChatPlugin";
import { LinkRouter } from "common/style/UtilStyles";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootReducer } from "stores/Admin/reducers";
import { FlexboxDiv, InstagramWidgetWrapper } from "../CreateWidgetStyle";
import MediaCardGuides from "../MediaCardGuides";
import {
  DivActionStep,
  DivActionStepContent,
  DivImage,
  DivImageDone,
  DivLink,
  DivLinkHelp,
  DivText,
  DivTextDone,
  Step3Caption,
  Step3Content,
  Step3DoneContent,
  Step3Wrapper,
} from "./Step3Style";

function Step3() {
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);

  const [step, setStep] = useState(1);
  const onNext = () => setStep(2);
  const onPrevious = () => setStep(1);

  return (
    <InstagramWidgetWrapper>
      <FlexboxDiv>
        {step === 1 ? (
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
              <DivImage>
                <img
                  src={ImageStorage.Instagram.InstagramGuides}
                  alt="Instagram guides add widget"
                />
              </DivImage>
              <DivLinkHelp onClick={ChatPlugin.Open}>Need help?</DivLinkHelp>
              <DivActionStep>
                <Pagination hasPrevious={false} hasNext onNext={onNext} />
                <DivActionStepContent>1/2</DivActionStepContent>
              </DivActionStep>
            </Step3Content>
          </Step3Wrapper>
        ) : (
          <Step3Wrapper>
            <Step3Caption>How to add the widget to your website</Step3Caption>
            <Step3DoneContent>
              <DivTextDone>
                Select the page you want to add an app widget.
                <br />
                For example, choose Default Product.
                <br />
                Click on the Add block button.
                <br />
                Scroll down to App section &gt; Select our app.
                <br />
                Drag&drop this App block to the expected position.
                <br />
                Click Save to finish.
              </DivTextDone>
              <DivImageDone>
                <img
                  src={ImageStorage.Instagram.InstagramGuides2}
                  alt="Instagram guides add widget"
                />
              </DivImageDone>
            </Step3DoneContent>
            <Step3DoneContent>
              <DivActionStep mt={0}>
                <Pagination
                  hasPrevious
                  hasNext={false}
                  onPrevious={onPrevious}
                />
                <DivActionStepContent>2/2</DivActionStepContent>
              </DivActionStep>
              <DivLink
                to={`/my-instagram-widget?shop=${shopReducer.shop.domain}`}
              >
                I've done
              </DivLink>
            </Step3DoneContent>
          </Step3Wrapper>
        )}
        <MediaCardGuides></MediaCardGuides>
      </FlexboxDiv>
    </InstagramWidgetWrapper>
  );
}

export default Step3;
