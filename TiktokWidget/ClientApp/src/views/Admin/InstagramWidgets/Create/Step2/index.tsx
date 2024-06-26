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
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (widgetReducer.step < 2) {
      dispatch(ApplicationActionTS.OnHandleMenuItem("instagram-step"));
      navigate(`/instagram-step-1?shop=${shopReducer.shop.domain}`);
    }
  }, []);

  return (
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
  );
}

export default Step2;
