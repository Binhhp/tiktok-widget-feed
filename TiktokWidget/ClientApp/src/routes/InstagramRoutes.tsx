import MainLayout from "layout/MainLayout";
import React, { lazy } from "react";
import Loadable from "ui-components/Loadable";

//Create Widget
const CreateWidget = Loadable(
  lazy(() => import("views/Admin/InstagramWidgets/CreateWidgets"))
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
      path: "/create-instagram-widget",
      element: <CreateWidget />,
    },
    {
      path: "/my-instagram-widget",
      element: <MyWidget />,
    },
  ],
};

export default InstagramRoutes;
