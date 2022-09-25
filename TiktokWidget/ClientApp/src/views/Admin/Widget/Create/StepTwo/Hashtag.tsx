import { Icon } from "@shopify/polaris";
import { HashtagMajor } from "@shopify/polaris-icons";
import React from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import { HashtagWrapper, IconTikTok } from "./StepTwoStyle";
import IconNetwork from "ui-components/IconNetwork";
import { ImageStorage } from "assets/images/ImageStorage";
import Image from "ui-components/Image";

function Hashtag() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.widgetReducer
  );
  return (
    <HashtagWrapper>
      <Icon source={HashtagMajor} />
      <h2>{widgetReducer.settings.valueSource}</h2>
      <IconTikTok>
        <IconNetwork>
          <Image src={ImageStorage.LogoTikTok} alt="TikTok Feed" />
        </IconNetwork>
      </IconTikTok>
    </HashtagWrapper>
  );
}

export default Hashtag;
