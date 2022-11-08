import React from "react";
import { AppIntegrationWrapper } from "./AppIntegrationsStyle";
import { Card, MediaCard } from "@shopify/polaris";
import { ImageStorage } from "assets/images/ImageStorage";
import AppIntegrationProvider from "./AppModel";

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
            title={AppIntegrationProvider.FacebookPixel.title}
            primaryAction={{
              content: 'Learn more',
              onAction: () => {
                window.open(AppIntegrationProvider.FacebookPixel.url);
              },
            }}
            description={AppIntegrationProvider.FacebookPixel.desc}
          >
            <Card sectioned>
              <a
                href={AppIntegrationProvider.FacebookPixel.url}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  loading="lazy"
                  alt={AppIntegrationProvider.FacebookPixel.title}
                  src={ImageStorage.FacebookPixel}
                />
              </a>
            </Card>
          </MediaCard>
        </div>
        <div className='card-item'>
          <MediaCard
            portrait
            title={AppIntegrationProvider.QuantityDiscount.title}
            primaryAction={{
              content: 'Learn more',
              onAction: () => {
                window.open(AppIntegrationProvider.QuantityDiscount.url);
              },
            }}
            description={AppIntegrationProvider.QuantityDiscount.desc}
          >
            <Card sectioned>
              <a
                href={AppIntegrationProvider.QuantityDiscount.url}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  alt="Quantity Discount App"
                  loading="lazy"
                  src={ImageStorage.Discount}
                />
              </a>
            </Card>
          </MediaCard>
        </div>
      </div>
    </AppIntegrationWrapper>
  );
}

export default AppIntegrations;
