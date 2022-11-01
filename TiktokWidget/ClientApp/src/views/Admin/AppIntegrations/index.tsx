import React from "react";
import { AppIntegrationWrapper } from "./AppIntegrationsStyle";
import { MediaCard } from "@shopify/polaris";

function AppIntegrations() {
  return (
    <AppIntegrationWrapper>
      <p className="title">
        <span className="">Integrations</span> 3rd party applications supported
        by Tikify
      </p>
      <div className="main">
        <div className="card-item">
          <MediaCard
            portrait
            title="Facebook Pixels Conversion API"
            primaryAction={{
              content: "Learn more",
              onAction: () => {},
            }}
            description="#1 Facebook Pixel tracking, Conversion API supported, Solution for IOS update, Tracking 100% purchase events
            "
          >
            <img
              alt=""
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
            />
          </MediaCard>
        </div>
        <div className="card-item">
          <MediaCard
            portrait
            title="Quantity Discount Order Limits"
            primaryAction={{
              content: "Learn more",
              onAction: () => {},
            }}
            description="Easily set up discount campaign based on any rules. Only discount in multiple (buy 3,6,9,...) is also available now!"
          >
            <img
              alt=""
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
            />
          </MediaCard>
        </div>
      </div>
    </AppIntegrationWrapper>
  );
}

export default AppIntegrations;
