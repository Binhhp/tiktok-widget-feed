import React from "react";
import { Caption } from "../../../CreateWidgetStyle";
import {
  FormConfigContent,
  FormConfiguration,
  FormConfigWrapper,
} from "./FormConfigStyle";
import FormLeftItem from "./FormLeftItem";
import FormRightItem from "./FormRightItem";

function FormConfigs() {
  return (
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
