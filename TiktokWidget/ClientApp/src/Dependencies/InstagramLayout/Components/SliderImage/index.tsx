import React from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { SliderImageWrapper } from "./SliderImageStyle";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Navigation]);

interface SliderImageProps {
  images: string[];
  desc: string;
}
function SliderImage(props: SliderImageProps) {
  return (
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
        slideNextClass="orichi-instagram-player-next"
        slidePrevClass="orichi-instagram-player-prev"
        className="orichi-instagram-slider"
      >
        {props.images.map((item, index) => (
          <SwiperSlide key={`image-${index}`}>
            <img
              loading="lazy"
              className="orichi-instagram-img"
              src={item}
              alt={props.desc}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderImageWrapper>
  );
}

export default SliderImage;
