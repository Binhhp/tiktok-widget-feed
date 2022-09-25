import { ImageStorage } from "assets/images/ImageStorage";
import React from "react";
import { ImageStyle } from "ui-components/UtilsStyle";
import {
  ButtonItem,
  ButtonItemDiv,
  GuidesContainer,
  GuidesContainerItem,
  GuidesContent,
  GuidesDivFooter,
  GuidesFlexDiv,
} from "./GuidesStyle";
import Guides2 from "assets/images/Guides/guides2.png";
import { IGuidesStepProps } from "./GuidesModel";
import { LinkRouter } from "common/style/Utils.style";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";

function GuidesStep2(props: IGuidesStepProps) {
  const shopReducer = useSelector((state: RootReducer) => state.shopReducer);
  return (
    <GuidesContainer>
      <GuidesContainerItem pb={18} pt={29}>
        <h2>Step 2</h2>
        <ButtonItemDiv bottom={24} right={-15}>
          <ButtonItem onClick={props.setStep(1)} right={18}>
            <img src={ImageStorage.ButtonBasic.ButtonPrev} alt="Button Prev" />
          </ButtonItem>
          <ButtonItem>
            <img src={ImageStorage.ButtonBasic.ButtonNext} alt="Button Next" />
          </ButtonItem>
        </ButtonItemDiv>
        <GuidesFlexDiv>
          <GuidesContent>
            <p>
              Select the page you want to add an app widget. For example, choose
              Default Product.
              <br />
              <br />
              Click on the Add block button.
              <br />
              <br />
              Scroll down to App section &gt; Select our app.
              <br />
              <br />
              Drag&drop this App block to the expected position.
              <br />
              <br />
              Click Save to finish.
            </p>
          </GuidesContent>
          <div>
            <ImageStyle src={Guides2} alt="Guides step 2" />
          </div>
        </GuidesFlexDiv>
        <GuidesDivFooter>
          <a className="link-help" href="#" target="_blank">
            Need help?
          </a>
          <LinkRouter
            size="small"
            to={`/my-widget?shop=${shopReducer.shop.domain}`}
          >
            I've done
          </LinkRouter>
        </GuidesDivFooter>
      </GuidesContainerItem>
    </GuidesContainer>
  );
}

export default GuidesStep2;
