import React from "react";
import { CaptionStep } from "../CreateWidgetStyle";
import Pattern from "./Patterns";
import FormConfiguration from "./FormConfig";
import { Container, ContainerSection } from "common/style/UtilStyles";
import CreateWidgetProvider from "../CreateWidgetProvider";
import FormControlSource from "../StepOne/FormControl";
import FormSubmit from "./FormConfig/Form/FormSubmit";

function StepTwoUpdate() {
  const RenderSourceTypeUpdate = (
    <React.Fragment>
      <CaptionStep mb={30}>Step 1: Select source</CaptionStep>
      <ContainerSection bg="transparent" width={100} pb={15}>
        <FormControlSource
          size="small"
          hiddenSubmit={true}
          onSubmit={() => {}}
          saveStore={true}
          jobInterval
        ></FormControlSource>
      </ContainerSection>
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
          height="calc(100% - 60px)"
          data-simplebar
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
        <ContainerSection width={100} pt={20} pl="40%" pr={30} pb={40}>
          <FormConfiguration></FormConfiguration>
        </ContainerSection>
      </Container>
    </CreateWidgetProvider>
  );
}

export default StepTwoUpdate;
