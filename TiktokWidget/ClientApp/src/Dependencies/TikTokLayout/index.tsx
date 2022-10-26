import React from "react";
import LayoutTemplate from "./LayoutTemplate";
import LayoutTemplateContextProvider from "./LayoutTemplateContext";
import { ITemplateProps } from "./LayoutTemplateType";

function Layout(props: ITemplateProps) {
  return props.disableContext ? (
    <LayoutTemplate {...props}></LayoutTemplate>
  ) : (
    <LayoutTemplateContextProvider>
      <LayoutTemplate {...props}></LayoutTemplate>
    </LayoutTemplateContextProvider>
  );
}

export default React.memo(Layout);
