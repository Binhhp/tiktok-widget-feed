import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui/src/Fancybox/Fancybox";

function FancyBox({ src, children }) {
  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      showClass: "fancybox-fadeIn",
      showLoading: true,
      animated: true,
      hideScrollbar: true,
      closeButton: "inside",
    });
  });
  return (
    <a href="javascripts:void(0);" data-fancybox="gallery" data-src={src}>
      {children}
    </a>
  );
}

export default FancyBox;
