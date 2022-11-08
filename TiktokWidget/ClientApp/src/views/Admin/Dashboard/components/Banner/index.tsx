import React from 'react';
import { useSelector } from 'react-redux';
import { RootComponent } from './style';
import { RootReducer } from 'stores/Admin/reducers';
//Swiper
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
// Import Swiper styles
import { getBanners } from 'repositories/api';
SwiperCore.use([Navigation]);

const Banner = () => {
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);
  const { data } = useSWR('/odata/Banner', getBanners);
  console.log({ data });
  return (
    <RootComponent>
      <h3>
        Welcome to{' '}
        {shopReducer.shop.shopDescriptor?.shopOwner ??
          shopReducer?.shop?.domain}
        !🎉
      </h3>
      <p className='text-welcome'>
        You will be able to see top performers based on views and
        call-to-actions
      </p>
      <div style={{ marginTop: '10px' }}>
        <Swiper
          navigation={true}
          // pagination={{
          //   clickable: true,
          // }}
          className='swipper'
          // cssMode={true}
          // navigation={true}
          // pagination={true}
          // mousewheel={true}
        >
          {data?.value?.map((item) => (
            <SwiperSlide key={`slider-${item.id}`}>
              <img src={item.image} alt='BannerImg' />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </RootComponent>
  );
};

export default Banner;
