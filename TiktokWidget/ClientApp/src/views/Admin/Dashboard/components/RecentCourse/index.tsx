import React, { useState } from "react";
import { getRecentCourses } from "repositories/api";
import useSWR from "swr";
import { Root } from "./style";

//Swiper
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import RecentCourseItem from "./RecentCourseItem";
import { Pagination } from "@shopify/polaris";
SwiperCore.use([Autoplay, Navigation]);

const RecentCourse = () => {
  const { data } = useSWR("/odata/Courses", getRecentCourses);
  const courses = data?.value || [];
  const [swiperController, setSwiperController] = useState<SwiperCore>();

  const [isNext, setIsNext] = useState(true);
  const [isPrev, setIsPrev] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);

  const onNext = () => swiperController?.slideNext();
  const onPrev = () => swiperController?.slidePrev();

  return courses.length > 0 ? (
    <Root>
      <p className="orichi-courses-title">Recent Course</p>
      <div className="orichi-courses-slider">
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
          {courses.map((item) => (
            <SwiperSlide key={`slider-${item.id}`}>
              <RecentCourseItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="orichi-courses-action">
          <Pagination
            hasNext={isNext}
            hasPrevious={isPrev}
            onNext={onNext}
            onPrevious={onPrev}
          ></Pagination>
          <span className="orichi-courses-page">{`${activeIndex}/${courses.length}`}</span>
        </div>
      </div>
    </Root>
  ) : (
    <></>
  );
};

export default RecentCourse;
