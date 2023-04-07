import { MediaCard, VideoThumbnail } from "@shopify/polaris";
import { ImageStorage } from "assets/images/ImageStorage";
import config from "config";
import FancyBox from "Dependencies/FancyBoxProvider";
import React from "react";
import { MediaCardGuidesDiv, MediaCardWrapper } from "./CreateWidgetStyle";

function MediaCardGuides() {
  return (
    <MediaCardGuidesDiv>
      <MediaCardWrapper>
        <MediaCard
          title="How to add the Instagram feed video to the website?"
          primaryAction={{
            content: "Learn more",
            onAction: () => {
              window.open(config.learnMoreUrl);
            },
          }}
          description="Boost your website Higher visitor engagement with Instagram Video Feed."
        >
          <FancyBox src={config.youtubeUrl}>
            <VideoThumbnail
              onClick={() => {}}
              videoLength={81}
              thumbnailUrl={ImageStorage.Instagram.InstagramVideoBackgroundGuides}
            />
          </FancyBox>
        </MediaCard>
      </MediaCardWrapper>
    </MediaCardGuidesDiv>
  );
}

export default MediaCardGuides;
