import { UriProvider } from "common/functions/FuncUtils";
import { useQuery } from "hooks";
import MainLayout from "layout/MainLayout";
import React, { lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { ApplicationActionTS } from "stores/Admin/Application/action";
import { WidgetActionTS } from "stores/Admin/TiktokWidget/action";
import Loadable from "ui-components/Loading/Loadable";

//Create Widget
const CreateWidget = Loadable(
  lazy(() => import("views/Admin/TikTokWidgets/Create"))
);
const StepOne = Loadable(
  lazy(() => import("views/Admin/TikTokWidgets/Create/Step1"))
);
const StepTwo = Loadable(
  lazy(() => import("views/Admin/TikTokWidgets/Create/Step2"))
);
const StepTwoUpdate = Loadable(
  lazy(() => import("views/Admin/TikTokWidgets/Create/Step2/Update"))
);
const StepThree = Loadable(
  lazy(() => import("views/Admin/TikTokWidgets/Create/Step3"))
);
//Manager widgets
const MyWidget = Loadable(
  lazy(() => import("views/Admin/TikTokWidgets/MyWidget"))
);

export const CreateTikTokRoutes = (isOnboarding: boolean = false) => {
  const shop = useQuery().get("shop");
  return {
    path: "/",
    element: shop ? (
      !isOnboarding ? (
        <MainLayout />
      ) : (
        <Navigate to={UriProvider.KeepParameters("/onboarding/tiktok")} />
      )
    ) : (
      <Navigate to={UriProvider.KeepParameters("/not-found")} />
    ),
    children: [
      {
        path: "/create-widget",
        element: <CreateWidget />,
      },
      {
        path: "/create-widget-step-1",
        element: <StepOne />,
      },
      {
        path: "/create-widget-step-2",
        element: <StepTwo />,
      },
      {
        path: "/create-widget-step-2/:widgetId",
        element: <StepTwoUpdate />,
      },
      {
        path: "/create-widget-step-3/:widgetId",
        element: <StepThree />,
      },
    ],
  };
};

export const MyTikTokRoutes = (isOnboarding = false) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.location.pathname.includes("/my-widget")) {
      Promise.all([
        dispatch(ApplicationActionTS.OnHandleMenuItem("my-widget", true)),
        dispatch(WidgetActionTS.OnStep(0)),
        dispatch(WidgetActionTS.OnSetSetting(true)),
      ]);
    }
  }, []);

  return {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/my-widget",
        element: <MyWidget />,
      },
    ],
  };
};
