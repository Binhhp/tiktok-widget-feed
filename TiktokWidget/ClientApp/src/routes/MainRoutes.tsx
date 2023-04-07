import { UriProvider } from "common/functions/FuncUtils";
import { useQuery } from "hooks";
import MainLayout from "layout/MainLayout";
import React, { lazy } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { ApplicationActionTS } from "stores/Admin/Application/action";
import Loadable from "ui-components/Loading/Loadable";

const Dashboard = Loadable(lazy(() => import("views/Admin/Dashboard")));
//Setup Button widget
const ButtonWidget = Loadable(lazy(() => import("views/Admin/ButtonWidget")));
//Apps Support Integrations
const AppIntegrationWrapper = Loadable(
  lazy(() => import("views/Admin/AppIntegrations"))
);
//OnBoarding
const OnBoarding = Loadable(
  lazy(() => import("views/Admin/Components/OnBoarding"))
);
const MainRoutes = () => {
  const dispatch = useDispatch();
  const shop = useQuery().get("shop");
  dispatch(ApplicationActionTS.OnHandleMenuItem("dashboard", true));
  return {
    path: "/",
    element: shop ? (
      <MainLayout />
    ) : (
      <Navigate to={UriProvider.KeepParameters("/not-found")} />
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
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
        path: "/onboarding/:widget",
        element: <OnBoarding />,
      },
      {
        path: "*",
        element: <Dashboard />,
      },
    ],
  };
};

export const OnboardingRoute = (isOnboarding: boolean = false) => {
  return {
    path: "/",
    element: isOnboarding ? (
      <MainLayout />
    ) : (
      <Navigate to={UriProvider.KeepParameters("/")} />
    ),
    children: [
      {
        path: "/onboarding/:widget",
        element: <OnBoarding />,
      },
    ],
  };
};
export default MainRoutes;
