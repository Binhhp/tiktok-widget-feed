import React from "react";
import InstagramLayoutContextProvider from "./InstagramLayoutContext";
import { IInstagramLayoutView } from "./InstagramLayoutModel";
import { InstagramLayoutWrappepr } from "./InstagramLayoutStyle";
import InstagramLayoutView from "./InstagramLayoutView";

function InstagramLayout(props: IInstagramLayoutView) {
  return props.disableContext ? (
    <InstagramLayoutWrappepr>
      <InstagramLayoutView {...props}></InstagramLayoutView>
    </InstagramLayoutWrappepr>
  ) : (
    <InstagramLayoutWrappepr>
      <InstagramLayoutContextProvider>
        <InstagramLayoutView {...props}></InstagramLayoutView>
      </InstagramLayoutContextProvider>
    </InstagramLayoutWrappepr>
  );
}

export default InstagramLayout;
