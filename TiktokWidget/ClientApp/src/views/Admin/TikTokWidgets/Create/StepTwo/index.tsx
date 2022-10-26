import LayoutTemplateContextProvider from "Dependencies/TikTokLayout/LayoutTemplateContext";
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
