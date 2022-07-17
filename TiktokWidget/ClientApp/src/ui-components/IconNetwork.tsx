import React from "react";
import { IconNetworkWrapper, IIconNetworkWrapper } from "./UtilsStyle";

function IconNetwork(props: IIconNetworkWrapper) {
  return <IconNetworkWrapper {...props}>{props.children}</IconNetworkWrapper>;
}

export default IconNetwork;
