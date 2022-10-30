import { LoaderBackground, LoaderWrapper } from "../UtilsStyle";
import React from "react";
import SniperLoading from "./SniperLoading";

const ComponentLoader = () => (
  <LoaderBackground>
    <LoaderWrapper>
      <SniperLoading></SniperLoading>
    </LoaderWrapper>
  </LoaderBackground>
);

export default ComponentLoader;
