import React, { useState } from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { SliderImageWrapper } from "./SliderImageStyle";
import { Swiper, SwiperSlide } from "swiper/react";
import LazyImage from "./LazyImage";
import { UriProvider } from "common/functions/FuncUtils";
SwiperCore.use([Autoplay, Navigation, Pagination]);
interface SliderImageProps {
  images?: string[];
  thunbnail: string;
  desc: string;
  loading?: "opacity" | "fillBlur";
  corsProxy?: string;
  isEncodeURI?: boolean;
}
function SliderImage(props: SliderImageProps) {
  const images =
    props.images && props.images.length > 0
      ? props.images
      : props.thunbnail
      ? [props.thunbnail]
      : undefined;

  const [load, setLoad] = useState(false);
  const onLoadImage = () => {
    setLoad(true);
  };
  return images ? (
    <SliderImageWrapper>
      <div className={!load ? "loading" : "loaded"}>
        <Swiper
          observer={true}
          observeParents={true}
          parallax={true}
          centeredSlides={false}
          updateOnWindowResize
          watchOverflow={true}
          slidesPerView={1}
          pagination={load}
          navigation={load}
          slideNextClass="orichi-slider-player-next"
          slidePrevClass="orichi-slider-player-prev"
          className="orichi-slider-slider"
        >
          {images?.map((item, index) => (
            <SwiperSlide key={`image-${index}`}>
              <LazyImage
                isLoaded={load}
                onLoadImage={onLoadImage}
                loading={props.loading ?? "opacity"}
                src={UriProvider.FormatURLImage(
                  item,
                  props.corsProxy,
                  props.isEncodeURI
                )}
                alt={props.desc}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </SliderImageWrapper>
  ) : (
    <></>
  );
}

export default SliderImage;
