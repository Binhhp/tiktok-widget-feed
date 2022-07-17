import { SnipperLoader } from "./UtilsStyle";
import React from "react";
import { Spinner } from "@shopify/polaris";
export const SnipperLoading = () => (
  <SnipperLoader>
    <Spinner size="large" />
  </SnipperLoader>
);
