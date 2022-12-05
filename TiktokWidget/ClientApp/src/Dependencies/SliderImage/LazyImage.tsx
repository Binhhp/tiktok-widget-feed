import React from "react";
interface LazyImageProps {
  src: string;
  alt: string;
  loading: "opacity" | "fillBlur";
  isLoaded: boolean;
  onLoadImage: () => void;
}
export default function LazyImage(props: LazyImageProps) {
  return (
    <img
      loading="lazy"
      src={props.src ?? ""}
      alt={props.alt}
      className={
        props.isLoaded
          ? `orichi-slider-img ${
              props.loading === "fillBlur" ? "img-fill-loader" : "img-loader"
            }`
          : `orichi-slider-img ${
              props.loading === "fillBlur" ? "img-fill-loading" : "img-loading"
            }`
      }
      onLoad={props.onLoadImage}
    />
  );
}
