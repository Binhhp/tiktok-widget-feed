import {
  Button,
  Form,
  FormLayout,
  RadioButton,
  Stack,
  TextField,
  TextStyle,
} from "@shopify/polaris";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import { Caption, ColorRed } from "../CreateWidgetStyle";
import {
  FormContentDiv,
  FormContentFooterDiv,
  SectionWrapper,
} from "./StepOneStyle";
import { ErrorMessage, ValidatorProvider } from "common/constants/Validator";
import {
  FormStackRadio,
  FormValueSource,
} from "views/Admin/TikTokWidgets/Create/Step1/StepOneStyle";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
import { SourceTypeEnum } from "repositories/dtos/requests/GetVideoByJobRequest";

export interface IFormControl {
  onSubmit?: () => void;
  hiddenSubmit?: boolean;
  saveStore?: boolean;
  loading?: boolean;
  size?: "small" | "large";
}

function FormConfig(props: IFormControl) {
  const dispatch = useDispatch();
  const widgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );

  const handleSourceType = (_checked: any, newValue: string) => {
    dispatch(
      InstagramWidgetActionTS.OnSetSetting({
        source:
          newValue === "hashtag"
            ? SourceTypeEnum.InstagramHashTag
            : SourceTypeEnum.InstagramUserName,
      })
    );
  };

  const [errorTitle, setErrorTitle] = useState("");
  const [errorValue, setErrorValue] = useState("");

  const setTitle = (val: string) => {
    validateTitle(val);
    dispatch(
      InstagramWidgetActionTS.OnSetSetting({
        title: val,
      })
    );
  };

  const setValueSource = async (val: string) => {
    if (
      val.startsWith("#") &&
      widgetReducer.settings.source === SourceTypeEnum.InstagramHashTag
    )
      return;
    if (
      val.includes("@") &&
      widgetReducer.settings.source === SourceTypeEnum.InstagramUserName
    )
      return;
    validateValueSource(val);
    dispatch(
      InstagramWidgetActionTS.OnSetSetting({
        valueSource: val,
      })
    );
  };

  const onSubmitForm = () => {
    if (errorTitle && errorValue) return;
    const titleValid = validateTitle(widgetReducer.settings.title);
    const valueSourceValid = validateValueSource(
      widgetReducer.settings.valueSource
    );
    if (titleValid || valueSourceValid) return;
    if (props.onSubmit) props.onSubmit();
  };

  const validateTitle = (title?: string): boolean => {
    let isError = false;
    if (!title) {
      setErrorTitle(ErrorMessage.REQUIREMENTS.format("Widget Title"));
      isError = true;
    } else {
      setErrorTitle("");
    }
    return isError;
  };
  const validateValueSource = (val?: string): boolean => {
    let isError = false;
    if (
      widgetReducer.settings.source === SourceTypeEnum.InstagramHashTag &&
      !val
    ) {
      setErrorValue(ErrorMessage.REQUIREMENTS.format("Hashtag"));
      isError = true;
    } else if (
      widgetReducer.settings.source === SourceTypeEnum.InstagramUserName &&
      !val
    ) {
      setErrorValue(ErrorMessage.REQUIREMENTS.format("Instagram username"));
      isError = true;
    } else if (
      widgetReducer.settings.source === SourceTypeEnum.InstagramUserName &&
      !ValidatorProvider.UserName(val)
    ) {
      setErrorValue(ErrorMessage.WIDGET_USERNAME);
      isError = true;
    } else {
      setErrorValue("");
    }
    return isError;
  };

  return (
    <SectionWrapper>
      <Caption>Step 1: Instagram Source</Caption>
      <FormContentDiv>
        <Form noValidate onSubmit={onSubmitForm}>
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
              onChange={setTitle}
              placeholder="Widget Title"
              autoComplete="off"
              error={errorTitle}
            />
            <TextStyle>Source Type</TextStyle>
            <FormStackRadio>
              <Stack vertical>
                <RadioButton
                  label="Hashtag"
                  id="hashtag"
                  checked={
                    widgetReducer.settings.source ===
                    SourceTypeEnum.InstagramHashTag
                  }
                  name="hashtag"
                  value="0"
                  onChange={handleSourceType}
                />
                <RadioButton
                  id="username"
                  label="Username"
                  checked={
                    widgetReducer.settings.source ===
                    SourceTypeEnum.InstagramUserName
                  }
                  name="username"
                  value="1"
                  onChange={handleSourceType}
                />
              </Stack>
            </FormStackRadio>
            <FormValueSource>
              <TextField
                name="value"
                id="value"
                label=""
                helpText={`${
                  widgetReducer.settings.source ===
                  SourceTypeEnum.InstagramHashTag
                    ? "Do not include the “#” symbol"
                    : "Do not include the “@” symbol"
                }`}
                value={widgetReducer.settings.valueSource}
                onChange={(val) => setValueSource(val)}
                placeholder="Public Accounts or Hashtags"
                autoComplete="off"
                error={errorValue}
              />
            </FormValueSource>
            <FormContentFooterDiv>
              <Button
                submit
                primary
                id="btn-submit-form"
                loading={props.loading}
              >
                Next &gt;
              </Button>
            </FormContentFooterDiv>
          </FormLayout>
        </Form>
      </FormContentDiv>
    </SectionWrapper>
  );
}

export default FormConfig;
