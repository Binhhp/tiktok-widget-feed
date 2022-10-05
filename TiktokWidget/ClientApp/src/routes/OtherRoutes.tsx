import React from "react";
import NotFoundShop from "views/NotFound";

const NotFoundRoutes = {
  path: "/not-found",
  element: <NotFoundShop />,
};

const NotFoundUrlRoutes = {
  path: "*",
  element: <NotFoundShop />,
};

const EndpointManager = { NotFoundRoutes, NotFoundUrlRoutes };
export default EndpointManager;
