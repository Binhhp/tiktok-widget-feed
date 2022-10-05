import { FormConfiguration } from "./FormConfigStyle";
import React from "react";
import FormLeftItem from "./FormLeftItem";
import FormRightItem from "./FormRightItem";
function FormConfigTemplate() {
  return (
    <FormConfiguration>
      <FormLeftItem></FormLeftItem>
      <FormRightItem></FormRightItem>
    </FormConfiguration>
  );
}

export default React.memo(FormConfigTemplate);
