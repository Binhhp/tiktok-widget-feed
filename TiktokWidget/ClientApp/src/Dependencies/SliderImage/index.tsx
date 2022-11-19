import React from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { SliderImageWrapper } from "./SliderImageStyle";
import { Swiper, SwiperSlide } from "swiper/react";
import LazyImage from "./LazyImage";
SwiperCore.use([Autoplay, Navigation, Pagination]);
interface SliderImageProps {
  images?: string[];
  thunbnail: string;
  desc: string;
  corsProxy?: string;
}
function SliderImage(props: SliderImageProps) {
  const images =
    props.images && props.images.length > 0
      ? props.images
      : props.thunbnail
      ? [props.thunbnail]
      : undefined;

  return images ? (
    <SliderImageWrapper>
      <Swiper
        observer={true}
        observeParents={true}
        parallax={true}
        centeredSlides={false}
        updateOnWindowResize
        watchOverflow={true}
        slidesPerView={1}
        pagination
        navigation
        slideNextClass="orichi-slider-player-next"
        slidePrevClass="orichi-slider-player-prev"
        className="orichi-slider-slider"
      >
        {images?.map((item, index) => (
          <SwiperSlide key={`image-${index}`}>
            <LazyImage
              src={props.corsProxy ? `${props.corsProxy}${item}` : item}
              alt={props.desc}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderImageWrapper>
  ) : (
    <></>
  );
}

export default SliderImage;
