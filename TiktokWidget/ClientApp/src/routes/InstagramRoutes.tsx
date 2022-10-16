import MainLayout from "layout/MainLayout";
import React, { lazy } from "react";
import Loadable from "ui-components/Loadable";

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

const InstagramRoutes = {
  path: "/",
  element: <MainLayout />,
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

export default InstagramRoutes;
