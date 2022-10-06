import LayoutTemplateContextProvider from "Dependencies/LayoutTemplate/LayoutTemplateContext";
import TikTokLayout from "layout/TiktokLayout";
import React from "react";
import TikTok from "./Application";
import { ITikTokAppProps } from "./TikTokModel";

export default function TikTokApp(props: ITikTokAppProps) {
  return (
    <LayoutTemplateContextProvider>
      <TikTokLayout>
        <TikTok {...props}></TikTok>
      </TikTokLayout>
    </LayoutTemplateContextProvider>
  );
}
