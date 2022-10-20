import { InstagramWidgetWrapper } from "./CreateWidgetStyle";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
export default function InstagramCreateHOC({ children }: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (!window.location.pathname.includes("instagram-step")) {
        dispatch(InstagramWidgetActionTS.OnSetSetting(true));
        dispatch(InstagramWidgetActionTS.OnStep(1));
      }
    };
  }, []);
  return <InstagramWidgetWrapper>{children}</InstagramWidgetWrapper>;
}
