import React from "react";
import { SliderProps } from "./SliderModel";
import { DivSliderWrapper } from "./SliderStyle";
//Swiper
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Item from "../Item";
import { DivLayoutFlexbox } from "../InstagramLayoutStyle";
import { IInstagramDto } from "../InstagramLayoutModel";

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
      Math.ceil(
        props.items.length /
          ((window.innerWidth > 1200 ? props.option.numberPerRow : 2) * 2)
      )
    ).keys()
  );

  const RenderData = (number: number): IInstagramDto[] =>
    props.items.slice(
      number * (window.innerWidth > 1200 ? props.option.numberPerRow : 2) * 2,
      (window.innerWidth > 1200 ? props.option.numberPerRow : 2) *
        2 *
        (number + 1)
    );
  return (
    <DivSliderWrapper>
      {sliderNumber && sliderNumber.length > 1 ? (
        <Swiper
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
          {sliderNumber.map((number) => (
            <SwiperSlide key={`slider-${number}`}>
              <DivLayoutFlexbox>
                {RenderData(number).map((item, index) => (
                  <Item
                    key={`slider-${index}`}
                    onClick={props.onClick}
                    option={props.option}
                    item={item}
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
              width={100 / props.option.numberPerRow}
            ></Item>
          ))}
        </DivLayoutFlexbox>
      )}
    </DivSliderWrapper>
  );
}

export default React.memo(SliderInstagram);
