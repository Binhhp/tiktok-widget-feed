import React from "react";
import { ImageStyle } from "./UtilsStyle";

export interface ImageStyleProps {
  width: number | string;
  height: number | string;
}

export interface IImageProps {
  src?: string;
  alt?: string;
}
const Image = React.memo(function Image(props: IImageProps) {
  return <ImageStyle src={props.src} alt={props.alt} loading="lazy" />;
});

export default Image;
