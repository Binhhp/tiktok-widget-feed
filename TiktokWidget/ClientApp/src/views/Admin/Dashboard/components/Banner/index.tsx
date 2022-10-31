import { TextStyle } from '@shopify/polaris';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootReducer } from 'stores/reducers';
import { RootComponent } from './style';

const Banner = () => {
  const shopReducer = useSelector((state: RootReducer) => state.shopReducer);
  return (
    <RootComponent>
      <h3> Welcome to{shopReducer.shop.domain} 🎉</h3>
      <p className='text-welcome'>
        You will be able to see top performers based on views and
        call-to-actions
      </p>
    </RootComponent>
  );
};

export default Banner;
