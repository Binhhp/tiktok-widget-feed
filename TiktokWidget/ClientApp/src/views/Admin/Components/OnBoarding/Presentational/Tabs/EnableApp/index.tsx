import { MediaCard, VideoThumbnail } from "@shopify/polaris";
import { ImageStorage } from "assets/images/ImageStorage";
import config from "config";
import FancyBox from "Dependencies/FancyBoxProvider";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import { TabProps, WidgetType } from "../../../OnBoardingModel";
import { EnableAppTitle, EnableAppWrapper } from "../TabStyled";

function EnableAppController(props: TabProps) {
  const onSubmit = () => true;
  useEffect(() => {
    props.setActionFunc(onSubmit);
  }, []);

  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);
  return (
    <EnableAppWrapper className={props.enableApp ? "next" : "non-next"}>
      <MediaCard
        title={
          <EnableAppTitle>
            Enable Orichi snippet in the{" "}
            <a
              href={`https://${shopReducer.shop.domain}/admin/themes/current/editor`}
              target="_blank"
              rel="noreferrer"
              className="link-toggle"
            >
              Shopify Theme
            </a>
            . Kindly follow the steps provided in the left video to complete
            this step.
          </EnableAppTitle>
        }
        primaryAction={{
          content: props.enableApp ? "Verified" : "I've done",
          onAction: () => {
            props.setEnableApp();
          },
          id: props.enableApp ? "btn-verified" : "btn-done",
        }}
        secondaryAction={
          props.enableApp
            ? {
                content: "Next",
                onAction: () => {
                  if (props.onNext) props.onNext();
                },
                id: "btn-next",
              }
            : undefined
        }
        description=""
      >
        <FancyBox
          src={
            props.widgetType === WidgetType.Tiktok
              ? config.ONBOARDING.VideoTiktok
              : config.ONBOARDING.VideoInstagram
          }
        >
          <VideoThumbnail
            onClick={() => {}}
            videoLength={81}
            thumbnailUrl={
              props.widgetType === WidgetType.Tiktok
                ? config.ONBOARDING.ImgVideoTiktok
                : config.ONBOARDING.ImgVideoInstagram
            }
          />
        </FancyBox>
      </MediaCard>
    </EnableAppWrapper>
  );
}
export default React.memo(EnableAppController);
