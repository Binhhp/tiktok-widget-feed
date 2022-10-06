import React from "react";
import { WidgetContainer, WidgetWrapper } from "./CreateWidgetStyle";

function CreateWidgetProvider({ children }: any) {
  return (
    <WidgetContainer>
      <WidgetWrapper>{children}</WidgetWrapper>
    </WidgetContainer>
  );
}

export default CreateWidgetProvider;
