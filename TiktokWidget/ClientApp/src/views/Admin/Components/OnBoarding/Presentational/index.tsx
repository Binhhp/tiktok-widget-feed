import React, { useMemo } from "react";
import {
  OnBoardingContainerContent,
  OnBoardingContainerHeader,
  OnBoardingHeaderText,
  OnBoardingWrapperContainer,
  TabFooter,
} from "../OnBoardingStyled";
import { Button, Card, ProgressBar } from "@shopify/polaris";
import { IOnBoardingPresenProps } from "../OnBoardingModel";
import TabOnBoarding from "./Tabs";
import ImportVideos from "./Tabs/ImportVideo";
import TagProductController from "./Tabs/TagProduct";
import CustomizeDesign from "./Tabs/CustomizeDesign";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import EnableAppController from "./Tabs/EnableApp";
import TestAppController from "./Tabs/TestApp";
function OnBoardingPresentation(props: IOnBoardingPresenProps) {
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);

  const renderTabs = () => {
    switch (props.selected) {
      case 1:
        return <TagProductController {...props} />;
      case 2:
        return <CustomizeDesign {...props} />;
      case 3:
        return <EnableAppController {...props} />;
      case 4:
        return <TestAppController {...props} />;
      case 5:
        return <TestAppController {...props} />;
      default:
        return <ImportVideos {...props} />;
    }
  };

  const header = useMemo(
    () => (
      <OnBoardingContainerHeader>
        <h2>
          Hi!{" "}
          {shopReducer.shop?.shopDescriptor?.shopOwner ??
            shopReducer.shop.domain}{" "}
          👋
        </h2>
        <span>
          Welcome to Orichi, Kindly follow the steps given below to get started.
        </span>
      </OnBoardingContainerHeader>
    ),
    []
  );

  const headerTitle = useMemo(
    () => (
      <OnBoardingHeaderText>
        <h2>Setup Guide</h2>
        <div
          style={{
            marginTop: props.step > 0 ? `0px` : `12px`,
          }}
          className="process-bar"
        >
          {props.step > 0 && <span>{props.step}/5 completed</span>}
          <ProgressBar
            animated
            progress={props.step * (100 / 5)}
            color="highlight"
            size="small"
          />
        </div>
      </OnBoardingHeaderText>
    ),
    [props.step]
  );

  return (
    <OnBoardingWrapperContainer>
      {header}
      <OnBoardingContainerContent>
        <Card>
          <Card.Section
            title={headerTitle}
            actions={[
              {
                content: "Skip onboarding >>",
                id: "skip-onboarding",
                onAction: props.onSkipBoarding,
              },
            ]}
          ></Card.Section>
          <TabOnBoarding
            step={props.step}
            tabs={props.tabs}
            selected={props.selected}
            onSelect={props.handleTabChange}
          >
            <div className="orichi-tabs">{renderTabs()}</div>
            {props.selected !== 3 && (
              <TabFooter>
                <Button onClick={props.onNext} loading={props?.loadingNext}>
                  Next
                </Button>
              </TabFooter>
            )}
          </TabOnBoarding>
        </Card>
      </OnBoardingContainerContent>
    </OnBoardingWrapperContainer>
  );
}
export default React.memo(OnBoardingPresentation);
