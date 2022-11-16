import { UriProvider } from "common/functions/FuncUtils";
import InstagramLayoutContextProvider from "Dependencies/InstagramLayout/InstagramLayoutContext";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ApplicationActionTS } from "stores/Admin/Application/action";
import { RootReducer } from "stores/Admin/reducers";
import { FlexboxDiv } from "../CreateWidgetStyle";
import InstagramCreateHOC from "../InstagramCreateHOC";
import FormConfigs from "./FormConfig/Forms";
import LiveTemplates from "./FormConfig/LiveTemplates";
import TemplateSelect from "./Patterns";
import { FormLayoutContainer } from "./Step2Style";

function Step2() {
  const dispatch = useDispatch();

  const widgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (widgetReducer.step < 2) {
      dispatch(ApplicationActionTS.OnHandleMenuItem("instagram-step"));
      navigate(UriProvider.KeepParameters("/instagram-step-1"));
    }
  }, []);

  return (
    <InstagramLayoutContextProvider>
      <InstagramCreateHOC>
        {widgetReducer.step === 2 && (
          <FlexboxDiv>
            <TemplateSelect></TemplateSelect>
            <FormLayoutContainer>
              <LiveTemplates></LiveTemplates>
              <FormConfigs></FormConfigs>
            </FormLayoutContainer>
          </FlexboxDiv>
        )}
      </InstagramCreateHOC>
    </InstagramLayoutContextProvider>
  );
}

export default Step2;
