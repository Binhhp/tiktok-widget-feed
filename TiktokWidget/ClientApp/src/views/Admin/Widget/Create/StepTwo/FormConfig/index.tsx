import React from "react";
import FormConfigTemplate from "./Form";
import LiveTemplate from "./LiveTemplate";
import { DeviceManagement, FormConfiguration } from "./FormConfigStyle";
import { Icon } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "stores/reducers";
import { WidgetActionTS } from "stores/Widget/action";
import { DesktopMajor, MobileMajor } from "@shopify/polaris-icons";

function FormConfig() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.widgetReducer
  );

  const dispatch = useDispatch();
  const onLiveDevice = () => {
    dispatch(WidgetActionTS.OnHandleMobile(!widgetReducer.mobile));
  };
  return (
    <FormConfiguration>
      <LiveTemplate></LiveTemplate>
      <DeviceManagement onClick={onLiveDevice}>
        <Icon
          source={!widgetReducer.mobile ? MobileMajor : DesktopMajor}
        ></Icon>
      </DeviceManagement>
      <FormConfigTemplate></FormConfigTemplate>
    </FormConfiguration>
  );
}

export default FormConfig;
