import React from "react";
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
import * as Yup from "yup";
import { ColorRed } from "../CreateWidgetStyle";
import { ErrorMessage, ValidatorProvider } from "common/constants/Validator";
import { RootReducer } from "stores/Admin/reducers";
import { useDispatch, useSelector } from "react-redux";
import { WidgetActionTS } from "stores/Admin/Widget/action";
import { FormStackRadio, FormSubmitStep } from "./StepOneStyle";
import { ISettingProviderWidget } from "stores/Admin/Widget/state";

export interface IFormControlSource {
  onSubmit: (values: any, resetForm: any) => void;
  hiddenSubmit?: boolean;
  saveStore?: boolean;
  loading?: boolean;
  size?: "small" | "large";
}
function FormControlSource(props: IFormControlSource) {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.TiktokWidgetReducer
  );

  const dispatch = useDispatch();
  const handleSourceType = (_checked: any, newValue: string) => {
    dispatch(
      WidgetActionTS.OnSetSetting({
        source: newValue === "hashtag" ? 0 : 1,
      })
    );
  };

  const onFieldChange = (val: string, setFieldValue: any, key: string) => {
    if (val.startsWith("#") && widgetReducer.settings.source === 0) return;
    if (val.includes("@") && widgetReducer.settings.source === 1) return;
    setFieldValue(key, val);
    if (props.saveStore) {
      let copyState: ISettingProviderWidget = {};
      if (key === "title") copyState.title = val;
      if (key === "value") copyState.valueSource = val;
      dispatch(WidgetActionTS.OnSetSetting(copyState));
    }
  };

  return (
    <FormSubmitStep size={props.size}>
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
                  .required(ErrorMessage.REQUIREMENTS.format("Tiktok username"))
                  .test(
                    "check",
                    ErrorMessage.WIDGET_USERNAME,
                    (value?: string): boolean => {
                      return ValidatorProvider.UserName(value);
                    }
                  ),
        })}
        onSubmit={async (values, { resetForm }) => {
          await props.onSubmit(values, resetForm);
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
                    ? ""
                    : "Do not include the “@” symbol"
                }`}
                value={widgetReducer.settings.valueSource}
                onChange={(val) => onFieldChange(val, setFieldValue, "value")}
                placeholder={`${
                  widgetReducer.settings.source === 0 ? "#" : "@"
                }`}
                autoComplete="off"
                error={(touched.value && errors.value) || ""}
              />
              {!props.hiddenSubmit && (
                <Button submit id="btn-submit-form" loading={props.loading}>
                  Next Step
                </Button>
              )}
            </FormLayout>
          </Form>
        )}
      </Formik>
    </FormSubmitStep>
  );
}

export default FormControlSource;
