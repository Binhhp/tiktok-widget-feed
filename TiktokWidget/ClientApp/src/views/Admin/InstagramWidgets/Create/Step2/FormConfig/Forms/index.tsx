import { UriProvider } from "common/functions/FuncUtils";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootReducer } from "stores/Admin/reducers";
import { Caption } from "../../../CreateWidgetStyle";
import {
  FormConfigContent,
  FormConfiguration,
  FormConfigWrapper,
} from "./FormConfigStyle";
import FormLeftItem from "./FormLeftItem";
import FormRightItem from "./FormRightItem";

function FormConfigs() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (widgetReducer.step < 2) {
      navigate(UriProvider.KeepParameters(`/instagram-step-1`));
    }
  }, []);
  return widgetReducer.step !== 2 ? (
    <></>
  ) : (
    <FormConfigWrapper>
      <FormConfigContent>
        <Caption mb={42}>Widget Settings</Caption>
        <FormConfiguration>
          <FormLeftItem></FormLeftItem>
          <FormRightItem></FormRightItem>
        </FormConfiguration>
      </FormConfigContent>
    </FormConfigWrapper>
  );
}

export default FormConfigs;
