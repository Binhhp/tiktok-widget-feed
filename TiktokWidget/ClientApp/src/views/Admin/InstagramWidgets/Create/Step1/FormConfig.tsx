import {
  Button,
  Form,
  FormLayout,
  RadioButton,
  Stack,
  TextField,
  TextStyle,
} from "@shopify/polaris";
import { Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import { Caption, ColorRed } from "../CreateWidgetStyle";
import {
  FormContentDiv,
  FormContentFooterDiv,
  SectionWrapper,
} from "./StepOneStyle";
import * as Yup from "yup";
import { ErrorMessage, ValidatorProvider } from "common/constants/Validator";
import { FormStackRadio } from "views/Admin/TikTokWidgets/Create/StepOne/StepOneStyle";
import { useNavigate } from "react-router-dom";
import { IInstagramWidget } from "stores/Admin/InstagramWidget/state";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";

function FormConfig() {
  const dispatch = useDispatch();
  const widgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );

  const handleSourceType = (_checked: any, newValue: string) => {
    dispatch(
      InstagramWidgetActionTS.OnSetSetting({
        source: newValue === "hashtag" ? 0 : 1,
      })
    );
  };

  const onFieldChange = (val: string, setFieldValue: any, key: string) => {
    let copyState: IInstagramWidget = {};
    if (key === "title") {
      copyState.title = val;
      setFieldValue(key, val);
    }
    if (key === "value") {
      if (val.includes("#") && widgetReducer.settings.source === 0) return;
      else if (val.includes("@") && widgetReducer.settings.source === 1) return;
      else {
        copyState.valueSource = val;
        setFieldValue(key, val);
      }
    }
    dispatch(InstagramWidgetActionTS.OnSetSetting(copyState));
  };

  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);

  const navigate = useNavigate();
  const onNextStep = () => {
    dispatch(InstagramWidgetActionTS.OnStep(2));
    navigate(`/instagram-step-2?shop=${shopReducer.shop.domain}&admin=1`);
  };

  return (
    <SectionWrapper>
      <Caption>Step 1: Instagram Source</Caption>
      <FormContentDiv>
        <Formik
          initialValues={{
            title: widgetReducer.settings.title,
            value: widgetReducer.settings.valueSource,
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required(
              ErrorMessage.REQUIREMENTS.format("Widget Title")
            ),
            value:
              widgetReducer.settings.source === 0
                ? Yup.string().required(
                    ErrorMessage.REQUIREMENTS.format("Hashtag")
                  )
                : Yup.string()
                    .required(
                      ErrorMessage.REQUIREMENTS.format("Tiktok username")
                    )
                    .test(
                      "check",
                      ErrorMessage.WIDGET_USERNAME,
                      (value?: string): boolean => {
                        return ValidatorProvider.UserName(value);
                      }
                    ),
          })}
          onSubmit={async (values, { resetForm }) => {
            onNextStep();
          }}
        >
          {({ errors, handleSubmit, setFieldValue, touched, values }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  name="title"
                  id="title"
                  label={
                    <TextStyle>
                      Widget Title <ColorRed>(*)</ColorRed>
                    </TextStyle>
                  }
                  value={widgetReducer.settings.title}
                  onChange={(val) => onFieldChange(val, setFieldValue, "title")}
                  placeholder="Widget Title"
                  autoComplete="off"
                  error={(touched.title && errors.title) || ""}
                />
                <TextStyle>Source Type</TextStyle>
                <FormStackRadio>
                  <Stack vertical>
                    <RadioButton
                      label="Hashtag"
                      id="hashtag"
                      checked={widgetReducer.settings.source === 0}
                      name="hashtag"
                      value="0"
                      onChange={handleSourceType}
                    />
                    <RadioButton
                      id="username"
                      label="Username"
                      checked={widgetReducer.settings.source === 1}
                      name="username"
                      value="1"
                      onChange={handleSourceType}
                    />
                  </Stack>
                </FormStackRadio>
                <TextField
                  name="value"
                  id="value"
                  label=""
                  helpText={`${
                    widgetReducer.settings.source === 0
                      ? "Do not include the “#” symbol"
                      : "Do not include the “@” symbol"
                  }`}
                  value={widgetReducer.settings.valueSource}
                  onChange={(val) => onFieldChange(val, setFieldValue, "value")}
                  placeholder="Public Accounts or Hashtags"
                  autoComplete="off"
                  error={(touched.value && errors.value) || ""}
                />
                <FormContentFooterDiv>
                  <Button submit primary id="btn-submit-form">
                    Next &gt;
                  </Button>
                </FormContentFooterDiv>
              </FormLayout>
            </Form>
          )}
        </Formik>
      </FormContentDiv>
    </SectionWrapper>
  );
}

export default FormConfig;
