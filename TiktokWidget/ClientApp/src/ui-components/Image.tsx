import React from "react";
import { ImageStyle } from "./UtilsStyle";

const Image = React.memo(function Image({ src, alt }: any) {
  return <ImageStyle src={src} alt={alt} />;
});

export default Image;
