import React, { useState } from "react";
import { SliderProps } from "./SliderModel";
import { DivSliderWrapper } from "./SliderStyle";
//Swiper
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Item from "../Item";
import { DivLayoutFlexbox } from "../InstagramLayoutStyle";

SwiperCore.use([Autoplay, Navigation]);
function SliderInstagram(props: SliderProps) {
  const autoPlay = () => {
    if (props.autoplay) {
      return {
        delay: props?.autoplay as number,
        disableOnInteraction: false,
      };
    }
    return false;
  };

  const sliderNumber = Array.from(
    Array(
      Math.ceil(props.items.length / (props.option.numberPerRow * 2))
    ).keys()
  );

  const [page, setPage] = useState(0);

  const onActiveIndexChangeSwiper = (swiper: SwiperCore) => {
    const pageIndex =
      swiper.activeIndex > 0 ? swiper.activeIndex - 1 : swiper.activeIndex;
    setPage(pageIndex);
  };
  return (
    <DivSliderWrapper>
      {sliderNumber && sliderNumber.length > 1 ? (
        <Swiper
          onActiveIndexChange={onActiveIndexChangeSwiper}
          observer={true}
          observeParents={true}
          parallax={true}
          centeredSlides={false}
          autoplay={autoPlay()}
          navigation
          updateOnWindowResize
          watchOverflow={true}
          slidesPerView={1}
          direction={"horizontal"}
          slideNextClass="orichi-instagram-player-next"
          slidePrevClass="orichi-instagram-player-prev"
          className="orichi-instagram-slider"
        >
          {sliderNumber.map((number, index) => (
            <SwiperSlide key={`slider-${index}`}>
              <DivLayoutFlexbox>
                {props.items
                  .slice(
                    page * props.option.numberPerRow * 2,
                    props.option.numberPerRow * 2 * (page + 1)
                  )
                  .map((item, index) => (
                    <Item
                      key={`slider-${index}`}
                      onClick={props.onClick}
                      option={props.option}
                      item={item}
                      showAs={item.showAs}
                      width={100 / props.option.numberPerRow}
                    ></Item>
                  ))}
              </DivLayoutFlexbox>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <DivLayoutFlexbox>
          {props.items.map((item, index) => (
            <Item
              key={`slider-${index}`}
              onClick={props.onClick}
              option={props.option}
              item={item}
              showAs={item.showAs}
              width={100 / props.option.numberPerRow}
            ></Item>
          ))}
        </DivLayoutFlexbox>
      )}
    </DivSliderWrapper>
  );
}

export default React.memo(SliderInstagram);
