import React, { useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
}
export default function LazyImage(props: LazyImageProps) {
  const [load, setLoad] = useState(false);
  return (
    <img
      loading="lazy"
      src={props.src}
      alt={props.alt}
      className={
        load ? "orichi-slider-img img-loader" : "orichi-slider-img img-loading"
      }
      onLoad={() => setLoad(true)}
    />
  );
}
