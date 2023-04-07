import { TextField, TextStyle } from "@shopify/polaris";
import { ErrorMessage } from "common/constants/Validator";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import { WidgetActionTS } from "stores/Admin/TiktokWidget/action";
import { FormConfiguration } from "views/Admin/TikTokWidgets/Create/Step2/FormConfig/Form/FormConfigStyle";
import FormLeftItem from "views/Admin/TikTokWidgets/Create/Step2/FormConfig/Form/FormLeftItem";
import FormRightItem from "views/Admin/TikTokWidgets/Create/Step2/FormConfig/Form/FormRightItem";
import { FormSettingProp } from "../../../OnBoardingModel";
import { FormContainer } from "./styled";

export default function FormTkTokSetting(props: FormSettingProp) {
  const tiktokReducer = useSelector(
    (state: RootReducer) => state.TiktokWidgetReducer
  );

  const dispatch = useDispatch();
  const setTitle = (val: string) => {
    if (!val) {
      props.setError("title", ErrorMessage.REQUIREMENTS.format("Widget Title"));
    } else {
      props.setError("title", "");
    }
    dispatch(
      WidgetActionTS.OnSetSetting({
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
            value={tiktokReducer?.settings?.title ?? ""}
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
