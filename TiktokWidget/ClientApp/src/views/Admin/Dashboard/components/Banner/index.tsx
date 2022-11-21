import React, { useEffect, useState } from "react";
import { RootComponent } from "./style";
//Swiper
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { getBanners } from "repositories/api";
import { IBannerResponse } from "repositories/dtos/responses/IBanner";
SwiperCore.use([Autoplay, Pagination]);

const Banner = () => {
  const [data, setData] = useState<IBannerResponse | undefined>(undefined);

  useEffect(() => {
    getBanners().then((res) => {
      if (res) setData(res);
    });
  }, []);

  return (
    <RootComponent>
      {data && data?.value && data?.value?.length > 0 ? (
        <div className="banner-slider">
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
                  className="orichi-slide-img"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <></>
      )}
    </RootComponent>
  );
};

export default React.memo(Banner);
