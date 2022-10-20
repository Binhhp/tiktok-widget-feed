import React from "react";
import { FlexboxDiv } from "../CreateWidgetStyle";
import InstagramCreateHOC from "../InstagramCreateHOC";
import MediaCardGuides from "../MediaCardGuides";
import FormConfig from "./FormConfig";
function Step1() {
  return (
    <InstagramCreateHOC>
      <FlexboxDiv>
        <FormConfig></FormConfig>
        <MediaCardGuides></MediaCardGuides>
      </FlexboxDiv>
    </InstagramCreateHOC>
  );
}

export default Step1;
