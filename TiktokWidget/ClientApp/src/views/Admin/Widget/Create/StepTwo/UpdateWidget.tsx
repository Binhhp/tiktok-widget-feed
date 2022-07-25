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
      <CaptionStep mb={30}>Step 1: Select source</CaptionStep>
      <ContainerSection bg="transparent" width={100} pb={20}>
        <FormControlSource
          size="small"
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
          width={35}
          pt={20}
          pl={30}
          pr={20}
          bg="#fafafafa"
          position="fixed"
          zIndex={1}
          top={60}
          height="100%"
        >
          {RenderSourceTypeUpdate}
          <CaptionStep>Step 2: Select a template</CaptionStep>
          <Pattern
            style={{
              marginItem: 4,
              marginTopParent: 10,
              height: 110,
            }}
          ></Pattern>
          <FormSubmit></FormSubmit>
        </ContainerSection>
        <ContainerSection width={100} pt={20} pl="44%" pr={30} pb={40}>
          <FormConfiguration></FormConfiguration>
        </ContainerSection>
      </Container>
    </CreateWidgetProvider>
  );
}

export default StepTwoUpdate;
