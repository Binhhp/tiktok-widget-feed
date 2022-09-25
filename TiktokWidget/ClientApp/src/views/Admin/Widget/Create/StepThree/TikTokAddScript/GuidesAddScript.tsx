import { Icon, MediaCard, VideoThumbnail } from "@shopify/polaris";
import { CircleTickMajor } from "@shopify/polaris-icons";
import { Container, ContainerSection } from "common/style/Utils.style";
import FancyBox from "Dependencies/FancyBoxProvider";
import config from "config";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootReducer } from "stores/Admin/reducers";
import CodeInfo from "./CodeInfo";
import SectionInfo from "./SectionInfo";
import {
  AlertSuccess,
  MediaCardWrapper,
  SupportHelperText,
  TabItem,
  TabItemWrapper,
  TabMethods,
} from "./StepThreeStyle";
import { WidgetActionTS } from "stores/Admin/Widget/action";
import CreateWidgetProvider from "../../CreateWidgetProvider";
import { CaptionStep } from "../../CreateWidgetStyle";
function StepThree() {
  const [section, setSection] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSetSection = () => {
    if (config.showUseSection) {
      setSection(!section);
    }
  };
  const widgetReducer = useSelector(
    (state: RootReducer) => state.widgetReducer
  );
  const shopReducer = useSelector((state: RootReducer) => state.shopReducer);

  const { widgetId } = useParams();
  useEffect(() => {
    dispatch(WidgetActionTS.OnStep(2));
    if (widgetReducer.step < 2 && !widgetId)
      navigate(`/create-widget?shop=${shopReducer.shop.domain}`);
  }, []);

  return (
    <CreateWidgetProvider animation={true}>
      <Container>
        <ContainerSection width={30} pl={30} pt={30} bg="#fafafa">
          <AlertSuccess>
            <Icon source={CircleTickMajor} color="success"></Icon>
            You have successfully created a feed
          </AlertSuccess>
          <CaptionStep mb={40}>
            Step 3: Add the widget to your website
          </CaptionStep>
          {config.showUseSection && (
            <SupportHelperText mb={40}>
              There are 2 methods to add widget to your store
            </SupportHelperText>
          )}
          <TabMethods>
            <TabItemWrapper
              onClick={onSetSection}
              borderColor={section ? "#FE2C55" : ""}
              mb={20}
            >
              <TabItem
                bg={section ? "#FE2C55" : ""}
                color={section ? "#ffffff" : ""}
              >
                Add Code
              </TabItem>
            </TabItemWrapper>
            {config.showUseSection && (
              <TabItemWrapper
                onClick={onSetSection}
                borderColor={!section ? "#FE2C55" : ""}
              >
                <TabItem
                  bg={!section ? "#FE2C55" : ""}
                  color={!section ? "#ffffff" : ""}
                >
                  Use section
                </TabItem>
              </TabItemWrapper>
            )}
          </TabMethods>
        </ContainerSection>
        {section ? <CodeInfo></CodeInfo> : <SectionInfo></SectionInfo>}
        <ContainerSection width={30} pt={30} pr={20}>
          <MediaCardWrapper>
            <MediaCard
              title="Watch guides on YouTube"
              primaryAction={{
                content: "Learn more",
                onAction: () => {
                  window.open(config.learnMoreUrl);
                },
              }}
              description="How to add the code into desired place of your site?"
            >
              <FancyBox src={config.youtubeUrl}>
                <VideoThumbnail
                  onClick={() => {}}
                  videoLength={117}
                  thumbnailUrl={config.videoUrl}
                />
              </FancyBox>
            </MediaCard>
          </MediaCardWrapper>
        </ContainerSection>
      </Container>
    </CreateWidgetProvider>
  );
}

export default StepThree;
