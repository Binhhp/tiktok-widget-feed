import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export function useOutsideAlerter(ref: any, onRender: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onRender();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const configObserver = {
  rootMargin: "0px 0px 0px 0px",
  threshold: 0,
};

export function useLazyLoadImage(querySelectorAll: string) {
  useEffect(() => {
    let observer = new window.IntersectionObserver(function (entries, self) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          LoadImage(entry.target);
          self.unobserve(entry.target);
        }
      });
    }, configObserver);

    const images = document.querySelectorAll(querySelectorAll);
    if (images) {
      images.forEach((item) => {
        observer.observe(item);
      });
    }

    return () => {
      if (window.IntersectionObserver) {
        images.forEach((img) => {
          observer.unobserve(img);
        });
      }
    };
  }, [document.querySelectorAll(querySelectorAll)]);
}

function LoadImage(image: any) {
  image.src = image.dataset.src;
}
