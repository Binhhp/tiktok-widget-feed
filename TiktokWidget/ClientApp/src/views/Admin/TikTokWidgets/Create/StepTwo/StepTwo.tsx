import React, { useContext, useEffect } from "react";
import Profile from "Dependencies/Profile";
import { CaptionStep } from "../CreateWidgetStyle";
import { TitleTemplateMajor } from "./StepTwoStyle";
import Pattern from "./Patterns";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import FormConfiguration from "./FormConfig";
import Hashtag from "./Hashtag";
import { Container, ContainerSection } from "common/style/UtilStyles";
import CreateWidgetProvider from "../CreateWidgetProvider";
import { useNavigate } from "react-router-dom";
import FormSubmit from "./FormConfig/Form/FormSubmit";
import { LayoutTemplateContext } from "Dependencies/TikTokLayout/LayoutTemplateContext";

function StepTwo() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.TiktokWidgetReducer
  );

  const templateContext = useContext(LayoutTemplateContext);
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (widgetReducer.step < 2) {
      navigate(`/create-widget-step-1?shop=${shopReducer.shop.domain}`);
    }
  }, []);

  const RenderSourceType = (
    <React.Fragment>
      <TitleTemplateMajor>
        Let's start with creating a new widget!
      </TitleTemplateMajor>
      {widgetReducer.settings.source === 0 ? (
        <Hashtag></Hashtag>
      ) : (
        <Profile
          profileInfo={{
            name: templateContext.state?.user?.author,
            followers: templateContext.state?.user?.followerCount,
            following: templateContext.state?.user?.followingCount,
            avt: templateContext.state?.user?.avatarThumb,
            like: templateContext.state?.user?.diggCount,
          }}
          style={{ mb: 20 }}
        ></Profile>
      )}
    </React.Fragment>
  );

  return (
    <CreateWidgetProvider animation={true}>
      <Container position="relative">
        <ContainerSection
          width={32}
          pt={20}
          pl={30}
          pr={20}
          bg="#fafafafa"
          position="fixed"
          zIndex={1}
          top={60}
        >
          {RenderSourceType}
          <CaptionStep mt={35}>Step 2: Select a template</CaptionStep>
          <Pattern
            style={{
              marginTopParent: 15,
            }}
          ></Pattern>
          <FormSubmit></FormSubmit>
        </ContainerSection>
        <ContainerSection width={100} pt={30} pl="40%" pr={30} pb={40}>
          <FormConfiguration></FormConfiguration>
        </ContainerSection>
      </Container>
    </CreateWidgetProvider>
  );
}

export default StepTwo;
