import React from 'react';
import { getRecentCourses } from 'repositories/api';
import useSWR from 'swr';
import { Root } from './style';

//Swiper
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import RecentCourseItem from './RecentCourseItem';
SwiperCore.use([Autoplay, Navigation]);

const RecentCourse = () => {
  const { data } = useSWR('/odata/Courses', getRecentCourses);
  const courses = data?.value || [];
  return (
    <Root>
      <p className='title'>Recent Course</p>
      <div className='slider'>
        <Swiper
        // pagination={{
        //   clickable: true,
        // }}
        // className='swipper'
        // cssMode={true}
        // navigation={true}
        // pagination={true}
        // mousewheel={true}
        >
          {courses.map((item) => (
            <SwiperSlide key={`slider-${item.id}`}>
              <RecentCourseItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Root>
  );
};

export default RecentCourse;
