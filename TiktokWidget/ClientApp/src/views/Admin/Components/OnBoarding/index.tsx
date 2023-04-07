import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ApplicationActionTS } from "stores/Admin/Application/action";
import { RootReducer } from "stores/Admin/reducers";
import OnBoardingContainer from "./Container";
import { OnBoardingWrapper } from "./OnBoardingStyled";

function OnBoarding() {
  const { widget } = useParams();
  const dispatch = useDispatch();

  const appReducer = useSelector((state: RootReducer) => state.AppReducer);
  useLayoutEffect(() => {
    if (widget === "instagram") {
      if (!appReducer.menuItems.includes("instagram"))
        dispatch(ApplicationActionTS.OnHandleMenuItem("instagram"));
      dispatch(ApplicationActionTS.OnHandleMenuItem("instagram-step", true));
    } else {
      if (!appReducer.menuItems.includes("widget"))
        dispatch(ApplicationActionTS.OnHandleMenuItem("widget"));
      dispatch(ApplicationActionTS.OnHandleMenuItem("create-widget", true));
    }
  }, []);

  return (
    <OnBoardingWrapper>
      <OnBoardingContainer></OnBoardingContainer>
    </OnBoardingWrapper>
  );
}

export default OnBoarding;
