import React, { useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  loading: "opacity" | "fillBlur";
}
export default function LazyImage(props: LazyImageProps) {
  const [load, setLoad] = useState(false);
  const onLoadImage = () => {
    setLoad(true);
  };
  return (
    <img
      loading="lazy"
      src={props.src}
      alt={props.alt}
      className={
        load
          ? `orichi-slider-img ${
              props.loading === "fillBlur" ? "img-fill-loader" : "img-loader"
            }`
          : `orichi-slider-img ${
              props.loading === "fillBlur" ? "img-fill-loading" : "img-loading"
            }`
      }
      onLoad={onLoadImage}
    />
  );
}
