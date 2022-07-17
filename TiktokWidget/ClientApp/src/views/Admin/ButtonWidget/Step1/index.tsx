import { Button, Card } from "@shopify/polaris";
import { ImageStorage } from "assets/images/ImageStorage";
import { Container, ContainerSection } from "common/style/Utils.style";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonWidgetActionTS } from "stores/ButtonWidget/action";
import { RootReducer } from "stores/reducers";
import { ButtonWidgetControl } from "../ButtonWidgetStyle";

function Step1() {
  const buttonWidget = useSelector(
    (state: RootReducer) => state.buttonWidgetReducer
  );
  const dispatch = useDispatch();
  const onSetButton = (image: string) => () => {
    dispatch(
      ButtonWidgetActionTS.OnSetOptional({
        image: image,
      })
    );
  };

  const onNextStep = () => {
    dispatch(
      ButtonWidgetActionTS.OnSetOptional({
        step: 2,
      })
    );
  };
  return (
    <Card title="Step 1: Choose the button style" sectioned>
      <Container flexDirection="column" mb={20}>
        <ContainerSection width={100} mb={5}>
          <p>Several options are offered as Tiktok button</p>
        </ContainerSection>
        <ContainerSection width={100}>
          <p>You may also use a custom image</p>
        </ContainerSection>
      </Container>
      <Container flexDirection="row" mb={30}>
        {ImageStorage.ButtonTikTok.map((item, index) => (
          <ButtonWidgetControl
            key={`button-widget-${index}`}
            onClick={onSetButton(item)}
            borderColorHover="#08A6B9"
            borderColor={buttonWidget.image === item ? "#08A6B9" : "#fafafa"}
          >
            {item && <img src={item} alt="TikTok button" />}
          </ButtonWidgetControl>
        ))}
      </Container>
      {buttonWidget.step === 1 && (
        <Container flexDirection="row" justifyContent="flex-end">
          <Button onClick={onNextStep} primary>
            Next Step
          </Button>
        </Container>
      )}
    </Card>
  );
}

export default Step1;
