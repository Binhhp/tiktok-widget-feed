import React from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { SliderImageWrapper } from "./SliderImageStyle";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Navigation, Pagination]);

interface SliderImageProps {
  images?: string[];
  desc: string;
}
function SliderImage(props: SliderImageProps) {
  return props.images ? (
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
        {props.images?.map((item, index) => (
          <SwiperSlide key={`image-${index}`}>
            <img
              loading="lazy"
              className="orichi-slider-img"
              src={item}
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
