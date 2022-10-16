import React from "react";
import { FlexboxDiv, InstagramWidgetWrapper } from "../CreateWidgetStyle";
import MediaCardGuides from "../MediaCardGuides";
import FormConfig from "./FormConfig";
function Step1() {
  return (
    <InstagramWidgetWrapper>
      <FlexboxDiv>
        <FormConfig></FormConfig>
        <MediaCardGuides></MediaCardGuides>
      </FlexboxDiv>
    </InstagramWidgetWrapper>
  );
}

export default Step1;
