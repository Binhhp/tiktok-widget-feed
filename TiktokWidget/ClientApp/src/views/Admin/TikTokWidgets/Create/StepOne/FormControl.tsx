import React, { useState } from "react";
import {
  Button,
  Form,
  FormLayout,
  RadioButton,
  Stack,
  TextField,
  TextStyle,
} from "@shopify/polaris";
import { ColorRed } from "../CreateWidgetStyle";
import { ErrorMessage, ValidatorProvider } from "common/constants/Validator";
import { RootReducer } from "stores/Admin/reducers";
import { useDispatch, useSelector } from "react-redux";
import { WidgetActionTS } from "stores/Admin/Widget/action";
import {
  FormStackRadio,
  FormSubmitStep,
  FormValueSource,
} from "./StepOneStyle";
import { WidgetReponsitory } from "repositories/implements/WidgetReponsitory";
import { AddJobRequest } from "repositories/dtos/requests/AddJobRequest";
import { SearchMajor } from "@shopify/polaris-icons";

export interface IFormControlSource {
  onSubmit?: () => void;
  hiddenSubmit?: boolean;
  saveStore?: boolean;
  loading?: boolean;
  size?: "small" | "large";
  jobInterval?: boolean;
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

  const [errorTitle, setErrorTitle] = useState("");
  const [errorValue, setErrorValue] = useState("");

  const setTitle = (val: string) => {
    validateTitle(val);
    dispatch(
      WidgetActionTS.OnSetSetting({
        title: val,
      })
    );
  };

  const setValueSource = async (val: string) => {
    if (val.startsWith("#") && widgetReducer.settings.source === 0) return;
    if (val.includes("@") && widgetReducer.settings.source === 1) return;
    validateValueSource(val);
    dispatch(
      WidgetActionTS.OnSetSetting({
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
    if (widgetReducer.settings.source === 0 && !val) {
      setErrorValue(ErrorMessage.REQUIREMENTS.format("Hashtag"));
      isError = true;
    } else if (widgetReducer.settings.source === 1 && !val) {
      setErrorValue(ErrorMessage.REQUIREMENTS.format("Tiktok username"));
      isError = true;
    } else if (
      widgetReducer.settings.source === 1 &&
      !ValidatorProvider.UserName(val)
    ) {
      setErrorValue(ErrorMessage.WIDGET_USERNAME);
      isError = true;
    } else {
      setErrorValue("");
    }
    return isError;
  };

  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);

  const onAddJobVideo = () => {
    if (widgetReducer.settings.valueSource) {
      dispatch(WidgetActionTS.SetWorkingSearch(true));
      const widgetReponsitory = new WidgetReponsitory();
      const sourceType = widgetReducer.settings.source ?? 0;
      widgetReponsitory
        .AddJob(
          shopReducer.shop.domain,
          new AddJobRequest(widgetReducer.settings.valueSource, sourceType)
        )
        .then((res) => {
          if (res.Status) {
            dispatch(WidgetActionTS.RiseSequenceNumber());
          } else {
            dispatch(WidgetActionTS.SetWorkingSearch(false));
          }
        });
    }
  };

  return (
    <FormSubmitStep size={props.size}>
      <Form onSubmit={onSubmitForm}>
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
          <FormValueSource enableSearch={props.jobInterval}>
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
              onChange={(val) => setValueSource(val)}
              placeholder={`${widgetReducer.settings.source === 0 ? "#" : "@"}`}
              autoComplete="off"
              error={errorValue}
            />
            {props.jobInterval && (
              <Button
                loading={widgetReducer.workingSearch}
                icon={SearchMajor}
                onClick={onAddJobVideo}
                id="orichi-search"
              />
            )}
          </FormValueSource>
          {!props.hiddenSubmit && (
            <Button submit id="btn-submit-form" loading={props.loading}>
              Next Step
            </Button>
          )}
        </FormLayout>
      </Form>
    </FormSubmitStep>
  );
}

export default FormControlSource;
