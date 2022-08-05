import React from "react";
import ButtonWidgetView from "./ButtonWidgetView";
import ButtonWidgetContextProvider from "./ButtonWidgetContext";

function ButtonWidget() {
  return (
    <ButtonWidgetContextProvider>
      <ButtonWidgetView />
    </ButtonWidgetContextProvider>
  );
}

export default ButtonWidget;
