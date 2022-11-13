import React from "react";
import { useSelector } from "react-redux";
import { RootComponent } from "./style";
import { RootReducer } from "stores/Admin/reducers";
//Swiper
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
// Import Swiper styles
import { getBanners } from "repositories/api";
SwiperCore.use([Autoplay, Pagination]);

const Banner = () => {
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);
  const { data } = useSWR("/odata/Banner", getBanners);
  return (
    <RootComponent>
      <h3>
        Welcome to{" "}
        {shopReducer.shop.shopDescriptor?.shopOwner ??
          shopReducer?.shop?.domain}
        !🎉
      </h3>
      <p className="orichi-text-welcome">
        You will be able to see top performers based on views and
        call-to-actions
      </p>
      <div className="orichi-banner-slider">
        <Swiper
          slidesPerView={1}
          slidesPerGroup={1}
          observer={true}
          observeParents={true}
          parallax={true}
          loop
          pagination
          loopFillGroupWithBlank
          centeredSlides={false}
          navigation={false}
          watchOverflow={true}
          autoplay={true}
          className="swipper"
        >
          {data?.value?.map((item) => (
            <SwiperSlide key={`slider-${item.id}`}>
              <img
                src={item.image}
                alt="BannerImg"
                className="orichi-slider-poster"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </RootComponent>
  );
};

export default Banner;
