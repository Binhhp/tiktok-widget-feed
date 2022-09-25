import {
  ButtonItem,
  ButtonItemDiv,
  GuidesContainer,
  GuidesContainerItem,
} from "./GuidesStyle";
import React from "react";
import Guides1 from "assets/images/Guides/guides1.png";
import { ImageStyle } from "ui-components/UtilsStyle";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import { IGuidesStepProps } from "./GuidesModel";
import { ImageStorage } from "assets/images/ImageStorage";

function GuidesStep1(props: IGuidesStepProps) {
  const shopReducer = useSelector((state: RootReducer) => state.shopReducer);
  return (
    <GuidesContainer>
      <GuidesContainerItem pt={12}>
        <ButtonItemDiv right={-15}>
          <ButtonItem right={18}>
            <img src={ImageStorage.ButtonBasic.ButtonPrev} alt="Button Prev" />
          </ButtonItem>
          <ButtonItem onClick={props.setStep(2)}>
            <img src={ImageStorage.ButtonBasic.ButtonNext} alt="Button Next" />
          </ButtonItem>
        </ButtonItemDiv>
        <h2 style={{ marginBottom: `42px` }}>Step 1</h2>
        <p style={{ marginBottom: `41px` }}>
          From your Shopify admin, go to Online Store &gt; Themes. <br />
          Find the theme that you want to edit, and then click{" "}
          <a
            href={`https://${shopReducer.shop.domain}/admin/themes/current/editor`}
            target="_blank"
            rel="noreferrer"
          >
            Customize
          </a>
          .
        </p>
        <ImageStyle src={Guides1} alt="Guides step 1" />
      </GuidesContainerItem>
    </GuidesContainer>
  );
}

export default GuidesStep1;
