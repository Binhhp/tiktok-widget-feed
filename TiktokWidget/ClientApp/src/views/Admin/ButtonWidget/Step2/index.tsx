import {
  Button,
  ButtonGroup,
  Card,
  Form,
  FormLayout,
  TextField,
  TextStyle,
} from "@shopify/polaris";
import { Container, ContainerSection } from "common/style/UtilStyles";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import * as Yup from "yup";
import { ColorRed } from "views/Admin/TikTokWidgets/Create/CreateWidgetStyle";
import { ButtonWidgetActionTS } from "stores/Admin/ButtonWidget/action";
import { ErrorMessage, ValidatorProvider } from "common/constants/Validator";
import { StepAnimationButtonWidget } from "../ButtonWidgetStyle";
import { IButtonWidgetProps } from "../ButtonWidgetModel";
import { ButtonWidgetContext } from "../ButtonWidgetContext";

let schema = Yup.object().shape({
  userName: Yup.string()
    .required(ErrorMessage.REQUIREMENTS.format("Tiktok Username"))
    .test("check", ErrorMessage.WIDGET_USERNAME, (value?: string): boolean => {
      return ValidatorProvider.UserName(value);
    })
    .default(function () {
      return "";
    }),
});

function Step2(props: IButtonWidgetProps) {
  const buttonWidget = useSelector(
    (state: RootReducer) => state.ButtonWidgetReducer
  );
  const dispatch = useDispatch();

  const buttonWidgetContext = useContext(ButtonWidgetContext);
  const onFieldChange = (val: string) => {
    schema
      .validate({ userName: val })
      .then(() => buttonWidgetContext.OnSetState(""))
      .catch((err) => {
        buttonWidgetContext.OnSetState(err.errors[0]);
      });
    if (buttonWidget.id) {
      props.onSaveChanges();
    }
    dispatch(
      ButtonWidgetActionTS.OnSetOptional({
        step: buttonWidget.id ? 3 : 2,
        userName: val,
      })
    );
  };
  const setValOnChangeText =
    (type: "top" | "bottom" | "left" | "right") => () => {
      if (buttonWidget.id) {
        props.onSaveChanges();
      }
      switch (type) {
        case "top":
          return dispatch(
            ButtonWidgetActionTS.OnSetOptional({
              position: {
                top: true,
                bottom: false,
              },
            })
          );
        case "bottom":
          return dispatch(
            ButtonWidgetActionTS.OnSetOptional({
              position: {
                top: false,
                bottom: true,
              },
            })
          );
        case "left":
          return dispatch(
            ButtonWidgetActionTS.OnSetOptional({
              position: {
                right: false,
                left: true,
              },
            })
          );
        case "right":
          return dispatch(
            ButtonWidgetActionTS.OnSetOptional({
              position: {
                right: true,
                left: false,
              },
            })
          );
      }
    };

  const onNextStep = () => {
    if (buttonWidget.userName !== "" && buttonWidgetContext.state === "") {
      dispatch(
        ButtonWidgetActionTS.OnSetOptional({
          step: 3,
        })
      );
    }
  };

  return (
    <StepAnimationButtonWidget
      style={{
        display: `${buttonWidget.step > 1 ? "block" : "none"}`,
        transform: `translateY(0)`,
      }}
    >
      <Card sectioned title="Step 2: Choose the button position">
        <Container flexDirection="row" justifyContent="space-between" mb={30}>
          <ButtonGroup segmented>
            <Button
              primary={buttonWidget.position.bottom}
              onClick={setValOnChangeText("bottom")}
            >
              Bottom
            </Button>
            <Button
              primary={buttonWidget.position.top}
              onClick={setValOnChangeText("top")}
            >
              Top
            </Button>
          </ButtonGroup>
          <ButtonGroup segmented>
            <Button
              primary={buttonWidget.position.left}
              onClick={setValOnChangeText("left")}
            >
              Left
            </Button>
            <Button
              primary={buttonWidget.position.right}
              onClick={setValOnChangeText("right")}
            >
              Right
            </Button>
          </ButtonGroup>
        </Container>
        <Container flexDirection="column">
          <ContainerSection width={70} mb={10}>
            <Form noValidate onSubmit={() => {}}>
              <FormLayout>
                <TextField
                  name="username"
                  id="username"
                  label={
                    <TextStyle>
                      Tiktok Username <ColorRed>(*)</ColorRed>
                    </TextStyle>
                  }
                  value={buttonWidget.userName}
                  onChange={onFieldChange}
                  placeholder="Tiktok Username"
                  autoComplete="off"
                  error={buttonWidgetContext.state}
                />
              </FormLayout>
            </Form>
          </ContainerSection>
        </Container>
        {buttonWidget.step === 2 && (
          <Container flexDirection="row" justifyContent="flex-end">
            <Button
              onClick={onNextStep}
              primary
              disabled={
                buttonWidget.userName === "" || buttonWidgetContext.state !== ""
              }
            >
              Next Step
            </Button>
          </Container>
        )}
      </Card>
    </StepAnimationButtonWidget>
  );
}

export default Step2;
