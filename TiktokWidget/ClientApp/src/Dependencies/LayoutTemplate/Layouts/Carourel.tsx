import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/reducers";
import Item from "../Item";
import { LayoutPropTypes } from "../LayoutTemplateType";
//Swiper
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "ui-components/Loader";
import { TemplateStoreModel } from "stores/Templates/state";

SwiperCore.use([Autoplay, Navigation]);
function Carousel(props: LayoutPropTypes) {
  const templateReducer: TemplateStoreModel = useSelector(
    (state: RootReducer) =>
      state.templateStoreReducer.filter((x) => x.id === props.id)[0]
  );

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
    <Suspense fallback={<Loader></Loader>}>
      <Swiper
        slidesPerView={props.row}
        slidesPerGroup={props.row}
        observer={true}
        observeParents={true}
        parallax={true}
        centeredSlides={false}
        autoplay={autoPlay()}
        navigation={true}
        watchOverflow={true}
      >
        {templateReducer.items.map((item, index) => (
          <SwiperSlide key={`carousel-${index}`}>
            <Item
              enableHover={props.enableHover}
              clickRender={props.onClickLayoutRender}
              hiddenContent={props.hiddenContent}
              widthItem={100}
              options={props.options}
              bg={props.options?.bg}
              key={`carousel-${index}`}
              contentOverflow={props.contentOverflow}
              item={item}
              index={index}
              type={props.type}
              pr={props.style && props.style.pr === 0 ? props.style.pr : 5}
              pl={props.style && props.style.pl === 0 ? props.style.pl : 5}
              pb={props.style && props.style.pb === 0 ? props.style.pb : 5}
            ></Item>
          </SwiperSlide>
        ))}
      </Swiper>
    </Suspense>
  );
}

export default Carousel;
