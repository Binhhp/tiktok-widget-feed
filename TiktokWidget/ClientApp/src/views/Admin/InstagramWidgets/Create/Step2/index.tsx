import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ApplicationActionTS } from "stores/Admin/Application/action";
import { FlexboxDiv, InstagramWidgetWrapper } from "../CreateWidgetStyle";
import FormConfigs from "./FormConfig/Forms";
import LiveTemplates from "./FormConfig/LiveTemplates";
import TemplateSelect from "./Patterns";
import { FormLayoutContainer } from "./Step2Style";

function Step2() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ApplicationActionTS.OnHandleMenuItem("instagram-step-1"));
  }, []);
  return (
    <InstagramWidgetWrapper>
      <FlexboxDiv>
        <TemplateSelect></TemplateSelect>
        <FormLayoutContainer>
          <LiveTemplates></LiveTemplates>
          <FormConfigs></FormConfigs>
        </FormLayoutContainer>
      </FlexboxDiv>
    </InstagramWidgetWrapper>
  );
}

export default Step2;
