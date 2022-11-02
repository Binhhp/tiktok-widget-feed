import React, { useEffect } from "react";
function ApplicationContainer({ children }: any) {
  useEffect(() => {
    [
      "https://cdnjs.cloudflare.com/ajax/libs/Swiper/6.8.0/swiper-bundle.min.css",
      // "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.css",
    ].forEach((item: string) => {
      var styleEl = document.createElement("link");
      styleEl.rel = "stylesheet";
      styleEl.href = item;
      styleEl.crossOrigin = "anonymous";
      styleEl.referrerPolicy = "no-referrer";
      document.getElementsByTagName("head")[0].appendChild(styleEl);
    });
  }, []);

  return <>{children}</>;
}

export default ApplicationContainer;
