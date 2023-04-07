import { TextField, TextStyle } from "@shopify/polaris";
import { ErrorMessage } from "common/constants/Validator";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
import { RootReducer } from "stores/Admin/reducers";
import { FormConfiguration } from "views/Admin/InstagramWidgets/Create/Step2/FormConfig/Forms/FormConfigStyle";
import FormLeftItem from "views/Admin/InstagramWidgets/Create/Step2/FormConfig/Forms/FormLeftItem";
import FormRightItem from "views/Admin/InstagramWidgets/Create/Step2/FormConfig/Forms/FormRightItem";
import { FormSettingProp } from "../../../OnBoardingModel";
import { FormContainer } from "./styled";

export default function FormInstagramSetting(props: FormSettingProp) {
  const instagramWidgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );

  const dispatch = useDispatch();
  const setTitle = (val: string) => {
    if (!val) {
      props.setError("title", ErrorMessage.REQUIREMENTS.format("Widget Title"));
    } else {
      props.setError("title", "");
    }
    dispatch(
      InstagramWidgetActionTS.OnSetSetting({
        title: val,
      })
    );
  };
  return (
    <FormContainer data-simplebar>
      <FormConfiguration>
        <div className="form-left">
          <TextField
            name="title"
            id="title"
            label={<TextStyle>Widget Title</TextStyle>}
            value={instagramWidgetReducer.settings.title}
            onChange={setTitle}
            placeholder="Widget Title"
            autoComplete="off"
            error={props?.error?.title ?? ""}
          />
          <FormLeftItem></FormLeftItem>
        </div>
        <FormRightItem></FormRightItem>
      </FormConfiguration>
    </FormContainer>
  );
}
