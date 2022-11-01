import React from 'react';
import { useSelector } from 'react-redux';
import { RootComponent } from './style';
import BannerImg from 'assets/images/Banner.png';
import { RootReducer } from 'stores/Admin/reducers';

const Banner = () => {
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);
  return (
    <RootComponent>
      <h3> Welcome to {shopReducer.shop.shopDescriptor?.shopOwner ?? shopReducer?.shop?.domain}!🎉</h3>
      <p className='text-welcome'>
        You will be able to see top performers based on views and
        call-to-actions
      </p>

      <img src={BannerImg} alt='BannerImg' style={{ marginTop: '10px' }} />
    </RootComponent>
  );
};

export default Banner;
