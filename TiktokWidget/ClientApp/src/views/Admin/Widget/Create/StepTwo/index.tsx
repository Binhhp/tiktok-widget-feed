import React, { useEffect } from "react";
import Profile from "Dependencies/Profile";
import { CaptionStep } from "../CreateWidgetStyle";
import { TitleTemplateMajor } from "./StepTwoStyle";
import Pattern from "./Patterns";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "stores/reducers";
import FormConfiguration from "./FormConfig";
import Hashtag from "./Hashtag";
import { Container, ContainerSection } from "common/style/Utils.style";
import CreateWidgetProvider from "../CreateWidgetProvider";
import { useNavigate } from "react-router-dom";
import FormSubmit from "./FormConfig/Form/FormSubmit";
import { TemplateStoreModel } from "stores/Templates/state";
import { TemplateStoreActionTS } from "stores/Templates/action";

function StepTwo() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.widgetReducer
  );

  const templateReducer: TemplateStoreModel = useSelector(
    (state: RootReducer) => state.templateStoreReducer[0]
  );

  const shopReducer = useSelector((state: RootReducer) => state.shopReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (widgetReducer.step < 2) {
      navigate(`/create-widget-step-1?shop=${shopReducer.shop.domain}`);
    }
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(TemplateStoreActionTS.OnClearState());
    };
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
            name: templateReducer?.user?.author,
            followers: templateReducer?.user?.followerCount,
            following: templateReducer?.user?.followingCount,
            avt: templateReducer?.user?.avatarThumb,
            like: templateReducer?.user?.diggCount,
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
          width={35}
          pt={20}
          pl={30}
          bg="#fafafafa"
          position="fixed"
          zIndex={1}
          top={60}
          // height="1100px"
        >
          {RenderSourceType}
          <CaptionStep>Step 2: Select a template</CaptionStep>
          <Pattern></Pattern>
          <FormSubmit></FormSubmit>
        </ContainerSection>
        <ContainerSection width={100} pt={30} pl="45%" pr={30} pb={40}>
          <FormConfiguration></FormConfiguration>
        </ContainerSection>
      </Container>
    </CreateWidgetProvider>
  );
}

export default StepTwo;
