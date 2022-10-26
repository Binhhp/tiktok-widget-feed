import LayoutTemplateContextProvider from "Dependencies/TikTokLayout/LayoutTemplateContext";
import React from "react";
import StepTwoUpdate from "./UpdateWidget";
function StepTwoUpdateMain() {
  return (
    <LayoutTemplateContextProvider>
      <StepTwoUpdate></StepTwoUpdate>
    </LayoutTemplateContextProvider>
  );
}
export default StepTwoUpdateMain;
