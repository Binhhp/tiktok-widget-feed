import React from "react";
import { NotFoundShopContent, NotFoundShopWrapper } from "./NotFound";

function NotFound() {
  return (
    <NotFoundShopWrapper>
      <NotFoundShopContent>
        <h2>You haven't registered store for our application yet</h2>
        <p>Please contact our to install app</p>
      </NotFoundShopContent>
    </NotFoundShopWrapper>
  );
}

export default NotFound;
