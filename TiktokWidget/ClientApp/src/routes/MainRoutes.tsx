import MainLayout from "layout/MainLayout";
import React, { lazy } from "react";
import Loadable from "ui-components/Loadable";

const Dashboard = Loadable(lazy(() => import("views/Admin/Dashboard")));
//Create Widget
const CreateWidget = Loadable(lazy(() => import("views/Admin/Widget/Create")));
const StepOne = Loadable(
  lazy(() => import("views/Admin/Widget/Create/StepOne"))
);
const StepTwo = Loadable(
  lazy(() => import("views/Admin/Widget/Create/StepTwo"))
);
const StepTwoUpdate = Loadable(
  lazy(() => import("views/Admin/Widget/Create/StepTwo/Update"))
);
const StepThree = Loadable(
  lazy(() => import("views/Admin/Widget/Create/StepThree"))
);

const MyWidget = Loadable(lazy(() => import("views/Admin/Widget/MyWidget")));
const ButtonWidget = Loadable(lazy(() => import("views/Admin/ButtonWidget")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <CreateWidget />,
    },
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
    {
      path: "/button-widget",
      element: <ButtonWidget />,
    },
    {
      path: "*",
      element: <Dashboard />,
    },
  ],
};

export default MainRoutes;
