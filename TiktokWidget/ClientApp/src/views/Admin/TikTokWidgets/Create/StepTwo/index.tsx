import LayoutTemplateContextProvider from "Dependencies/LayoutTemplate/LayoutTemplateContext";
import StepTwo from "./StepTwo";
import React from "react";
function StepTwoMain() {
  return (
    <LayoutTemplateContextProvider>
      <StepTwo></StepTwo>
    </LayoutTemplateContextProvider>
  );
}
export default StepTwoMain;
