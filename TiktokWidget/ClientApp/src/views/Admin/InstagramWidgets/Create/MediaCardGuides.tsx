import { MediaCard, VideoThumbnail } from "@shopify/polaris";
import { ImageStorage } from "assets/images/ImageStorage";
import { ContainerSection } from "common/style/UtilStyles";
import config from "config";
import FancyBox from "Dependencies/FancyBoxProvider";
import React from "react";
import { MediaCardWrapper } from "./CreateWidgetStyle";

function MediaCardGuides() {
  return (
    <ContainerSection width="calc(35% - 39px)" ml={29} mr={10}>
      <MediaCardWrapper>
        <MediaCard
          title="How to embed the Instagram Feed to the website"
          primaryAction={{
            content: "Learn more",
            onAction: () => {
              window.open(config.learnMoreUrl);
            },
          }}
          description="You have a great product. Now, it’s time to test your idea to see if it can become a business."
        >
          <FancyBox src={config.youtubeUrl}>
            <VideoThumbnail
              onClick={() => {}}
              videoLength={81}
              thumbnailUrl={ImageStorage.VideoBackgroundGuides}
            />
          </FancyBox>
        </MediaCard>
      </MediaCardWrapper>
    </ContainerSection>
  );
}

export default MediaCardGuides;
