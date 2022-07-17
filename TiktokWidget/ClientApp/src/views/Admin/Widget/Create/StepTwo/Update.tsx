import React, { useEffect } from "react";
import { CaptionStep } from "../CreateWidgetStyle";
import Pattern from "./Patterns";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/reducers";
import FormConfiguration from "./FormConfig";
import { Container, ContainerSection } from "common/style/Utils.style";
import CreateWidgetProvider from "../CreateWidgetProvider";
import { useNavigate } from "react-router-dom";
import FormControlSource from "../StepOne/FormControl";
import FormSubmit from "./FormConfig/Form/FormSubmit";

function StepTwoUpdate() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.widgetReducer
  );
  const shopReducer = useSelector((state: RootReducer) => state.shopReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (widgetReducer.step < 2) {
      navigate(`/create-widget-step-1?shop=${shopReducer.shop.domain}`);
    }
  }, []);

  const RenderSourceTypeUpdate = (
    <React.Fragment>
      <CaptionStep mb={40}>Step 1: Select source</CaptionStep>
      <ContainerSection bg="transparent" width={100} pr={16} pb={40}>
        <FormControlSource
          hiddenSubmit={true}
          onSubmit={() => {}}
          saveStore={true}
        ></FormControlSource>
      </ContainerSection>
    </React.Fragment>
  );

  return (
    <CreateWidgetProvider animation={true}>
      <Container position="relative">
        <ContainerSection
          width={40}
          pt={40}
          pl={30}
          bg="#fafafafa"
          position="sticky"
          zIndex={1}
          top={60}
          height="1100px"
        >
          {RenderSourceTypeUpdate}
          <CaptionStep>Step 2: Select a template</CaptionStep>
          <Pattern></Pattern>
          <FormSubmit></FormSubmit>
        </ContainerSection>
        <ContainerSection width={60} pt={40} pl={30} pr={30} pb={40}>
          <FormConfiguration></FormConfiguration>
        </ContainerSection>
      </Container>
    </CreateWidgetProvider>
  );
}

export default StepTwoUpdate;
