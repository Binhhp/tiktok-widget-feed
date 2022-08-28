import React, { Suspense, useContext } from "react";
import Item from "../Item";
import { LayoutPropTypes } from "../LayoutTemplateType";
//Swiper
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "ui-components/Loader";
import { LayoutTemplateContext } from "../LayoutTemplateContext";

SwiperCore.use([Autoplay, Navigation]);
function Slider(props: LayoutPropTypes) {
  const templateContext = useContext(LayoutTemplateContext);

  const autoPlay = () => {
    if (props.autoplay) {
      return {
        delay: props?.autoplay as number,
        disableOnInteraction: false,
      };
    }
    return false;
  };

  return (
    <Suspense fallback={<Loader />}>
      <Swiper
        slidesPerView={1}
        slidesPerGroup={1}
        observer={true}
        observeParents={true}
        parallax={true}
        loop
        loopFillGroupWithBlank
        centeredSlides={false}
        autoplay={autoPlay()}
        navigation={true}
        watchOverflow={true}
      >
        {templateContext.state.items.map((item, index) => (
          <SwiperSlide key={`slider-${index}`}>
            <Item
              enableHover={props.enableHover}
              clickRender={props.onClickLayoutRender}
              hiddenContent={props.hiddenContent}
              flexDirection={
                props.showAll ? `column` : `${props.flexDirection ?? "row"}`
              }
              widthItem={props.showAll ? "100%" : "50%"}
              options={props.options}
              imgHeight={props.imgHeight ?? "100%"}
              bg={props.options?.bg}
              key={`slider-${props.type}-${index}`}
              contentOverflow={props.contentOverflow}
              item={item}
              index={index}
              type={props.type}
              pr={0}
              pl={0}
              pb={props.showAll ? 0 : 10}
            ></Item>
          </SwiperSlide>
        ))}
      </Swiper>
    </Suspense>
  );
}

export default Slider;
