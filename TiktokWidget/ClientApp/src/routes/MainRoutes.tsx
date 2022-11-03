import MainLayout from "layout/MainLayout";
import React, { lazy } from "react";
import Loadable from "ui-components/Loading/Loadable";

const Dashboard = Loadable(lazy(() => import("views/Admin/Dashboard")));
//Setup Button widget
const ButtonWidget = Loadable(lazy(() => import("views/Admin/ButtonWidget")));
//Apps Support Integrations
const AppIntegrationWrapper = Loadable(
  lazy(() => import("views/Admin/AppIntegrations"))
);
const MyWidget = Loadable(
  lazy(() => import("views/Admin/TikTokWidgets/MyWidget"))
);
const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <MyWidget />,
    },
    {
      path: "/button-widget",
      element: <ButtonWidget />,
    },
    {
      path: "/apps",
      element: <AppIntegrationWrapper />,
    },
    {
      path: "*",
      element: <Dashboard />,
    },
  ],
};

export default MainRoutes;
