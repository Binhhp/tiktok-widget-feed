import React from 'react';
import { AppIntegrationWrapper } from './AppIntegrationsStyle';
import { Card, MediaCard } from '@shopify/polaris';
import { ImageStorage } from 'assets/images/ImageStorage';

function AppIntegrations() {
  return (
    <AppIntegrationWrapper>
      <p className='title'>
        <span className=''>Integrations</span> 3rd party applications supported
        by Tikify
      </p>
      <div className='main'>
        <div className='card-item'>
          <MediaCard
            portrait
            title='Facebook Pixels Conversion API'
            primaryAction={{
              content: 'Learn more',
              onAction: () => {
                window.open(
                  'https://apps.shopify.com/yuri-facebook-multi-pixels?surface_source=tiktok&surface_type=in-app',
                );
              },
            }}
            description='#1 Facebook Pixel tracking, Conversion API supported, Solution for IOS update, Tracking 100% purchase events'>
            <Card sectioned>
              <a
                href='https://apps.shopify.com/quantity-break-limit-purchase?surface_source=tiktok&surface_type=in-app'
                target='_blank'
                rel='noreferrer'>
                <img alt='Facebook Pixel' src={ImageStorage.FacebookPixel} />
              </a>
            </Card>
          </MediaCard>
        </div>
        <div className='card-item'>
          <MediaCard
            portrait
            title='Quantity Discount Order Limits'
            primaryAction={{
              content: 'Learn more',
              onAction: () => {
                window.open(
                  'https://apps.shopify.com/quantity-break-limit-purchase?surface_source=tiktok&surface_type=in-app',
                );
              },
            }}
            description='Easily set up discount campaign based on any rules. Only discount in multiple (buy 3,6,9,...) is also available now!'>
            <Card sectioned>
              <a
                href='https://apps.shopify.com/quantity-break-limit-purchase?surface_source=tiktok&surface_type=in-app'
                target='_blank'
                rel='noreferrer'>
                <img alt='Discount' src={ImageStorage.Discount} />
              </a>
            </Card>
          </MediaCard>
        </div>
      </div>
    </AppIntegrationWrapper>
  );
}

export default AppIntegrations;
