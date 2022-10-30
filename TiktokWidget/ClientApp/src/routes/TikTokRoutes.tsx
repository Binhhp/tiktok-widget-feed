import MainLayout from "layout/MainLayout";
import React, { lazy } from "react";
import Loadable from "ui-components/Loading/Loadable";

//Create Widget
const CreateWidget = Loadable(
  lazy(() => import("views/Admin/TikTokWidgets/Create"))
);
const StepOne = Loadable(
  lazy(() => import("views/Admin/TikTokWidgets/Create/StepOne"))
);
const StepTwo = Loadable(
  lazy(() => import("views/Admin/TikTokWidgets/Create/StepTwo"))
);
const StepTwoUpdate = Loadable(
  lazy(() => import("views/Admin/TikTokWidgets/Create/StepTwo/Update"))
);
const StepThree = Loadable(
  lazy(() => import("views/Admin/TikTokWidgets/Create/StepThree"))
);

//Manager widgets
const MyWidget = Loadable(
  lazy(() => import("views/Admin/TikTokWidgets/MyWidget"))
);

const TikTokRoutes = {
  path: "/",
  element: <MainLayout />,
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
    {
      path: "/my-widget",
      element: <MyWidget />,
    },
  ],
};

export default TikTokRoutes;
