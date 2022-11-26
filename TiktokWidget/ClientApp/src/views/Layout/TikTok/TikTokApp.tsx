import TikTokLayout from "layout/TiktokLayout";
import React from "react";
import ApplicationContainer from "../Common/ApplicationContainer";
import TikTok from "./Application";
import { ITikTokAppProps } from "./TikTokModel";

export default function TikTokApp(props: ITikTokAppProps) {
  return (
    <ApplicationContainer>
      <TikTokLayout>
        <TikTok {...props}></TikTok>
      </TikTokLayout>
    </ApplicationContainer>
  );
}
