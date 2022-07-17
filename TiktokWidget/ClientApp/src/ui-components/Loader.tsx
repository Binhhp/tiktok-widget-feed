import { LoaderBackground, LoaderWrapper } from "./UtilsStyle";
import React from "react";
import { SnipperLoading } from "./SnipperLoading";

const Loader = () => (
  <LoaderBackground>
    <LoaderWrapper>
      <SnipperLoading></SnipperLoading>
    </LoaderWrapper>
  </LoaderBackground>
);

export default Loader;
