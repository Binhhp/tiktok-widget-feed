import React, { useState, useEffect } from "react";
import { Root } from "./style";

//Swiper
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import RecentCourseItem from "./RecentCourseItem";
import { Pagination } from "@shopify/polaris";
import { ICourseResponse } from "repositories/dtos/responses/ICourse";
import ShopAPI from "repositories/implements/ShopAPI";
SwiperCore.use([Autoplay, Navigation]);

const RecentCourse = () => {
  const [data, setData] = useState<ICourseResponse | undefined>(undefined);
  useEffect(() => {
    ShopAPI.GetRecentCourses().then((res) => {
      setData(res);
    });
  }, []);

  const [swiperController, setSwiperController] = useState<SwiperCore>();

  const [isNext, setIsNext] = useState(true);
  const [isPrev, setIsPrev] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);

  const onNext = () => swiperController?.slideNext();
  const onPrev = () => swiperController?.slidePrev();

  const RenderLoading = (
    <Swiper
      onActiveIndexChange={(swiperCore) => {
        setIsNext(!swiperCore.isEnd);
        setIsPrev(!swiperCore.isBeginning);
        setActiveIndex(swiperCore.activeIndex + 1);
      }}
      mousewheel
      updateOnWindowResize
      className="swipper"
      onSwiper={setSwiperController}
      slidesPerView={"auto"}
      spaceBetween={16}
    >
      {[{}, {}, {}].map((item: any) => (
        <SwiperSlide key={`slider-${item.id}`}>
          <RecentCourseItem item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
  return data === undefined || (data?.value && data?.value?.length > 0) ? (
    <Root>
      <p className="orichi-courses-title">Recent Course</p>
      <div className="orichi-courses-slider">
        {data?.value ? (
          <Swiper
            onActiveIndexChange={(swiperCore) => {
              setIsNext(!swiperCore.isEnd);
              setIsPrev(!swiperCore.isBeginning);
              setActiveIndex(swiperCore.activeIndex + 1);
            }}
            mousewheel
            updateOnWindowResize
            className="swipper"
            onSwiper={setSwiperController}
            slidesPerView={"auto"}
            spaceBetween={16}
          >
            {data?.value?.map((item) => (
              <SwiperSlide key={`slider-${item.id}`}>
                <RecentCourseItem item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          RenderLoading
        )}

        <div className="orichi-courses-action">
          <Pagination
            hasNext={isNext}
            hasPrevious={isPrev}
            onNext={onNext}
            onPrevious={onPrev}
          ></Pagination>
          <span className="orichi-courses-page">{`${activeIndex}/${
            data?.value?.length ?? 1
          }`}</span>
        </div>
      </div>
    </Root>
  ) : (
    <></>
  );
};

export default React.memo(RecentCourse);
