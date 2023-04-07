import { UriProvider } from "common/functions/FuncUtils";
import { useQuery } from "hooks";
import MainLayout from "layout/MainLayout";
import React, { lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { ApplicationActionTS } from "stores/Admin/Application/action";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
import Loadable from "ui-components/Loading/Loadable";

//Create Widget
const InstagramStep1 = Loadable(
  lazy(() => import("views/Admin/InstagramWidgets/Create/Step1"))
);

const InstagramStep2 = Loadable(
  lazy(() => import("views/Admin/InstagramWidgets/Create/Step2"))
);

const InstagramStep3 = Loadable(
  lazy(() => import("views/Admin/InstagramWidgets/Create/Step3"))
);

//Manager widgets
const MyWidget = Loadable(
  lazy(() => import("views/Admin/InstagramWidgets/MyWidgets"))
);

export const InstagramRoutes = (isOnboarding: boolean = false) => {
  const shop = useQuery().get("shop");
  return {
    path: "/",
    element: shop ? (
      !isOnboarding ? (
        <MainLayout />
      ) : (
        <Navigate to={UriProvider.KeepParameters("/onboarding/instagram")} />
      )
    ) : (
      <Navigate to={UriProvider.KeepParameters("/not-found")} />
    ),
    children: [
      {
        path: "/instagram-step-1",
        element: <InstagramStep1 />,
      },
      {
        path: "/instagram-step-2",
        element: <InstagramStep2 />,
      },
      {
        path: "/instagram-step-3",
        element: <InstagramStep3 />,
      },
      {
        path: "/my-instagram-widget",
        element: <MyWidget />,
      },
    ],
  };
};

export const MyInstagramRoutes = (count: number = 0) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.location.pathname.includes("/my-instagram-widget")) {
      Promise.all([
        dispatch(
          ApplicationActionTS.OnHandleMenuItem("my-instagram-widget", true)
        ),
        dispatch(InstagramWidgetActionTS.OnStep(0)),
        dispatch(InstagramWidgetActionTS.OnSetSetting(true)),
      ]);
    }
  }, []);

  return {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/my-instagram-widget",
        element: <MyWidget />,
      },
    ],
  };
};
