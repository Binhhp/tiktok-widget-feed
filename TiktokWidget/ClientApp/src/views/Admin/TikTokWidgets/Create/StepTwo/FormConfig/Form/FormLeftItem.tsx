import {
  Button,
  ButtonGroup,
  FormLayout,
  TextField,
  TextStyle,
} from "@shopify/polaris";
import { TemplateType } from "Dependencies/TikTokLayout/LayoutTemplateType";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import { WidgetActionTS } from "stores/Admin/Widget/action";
import { ISettingProviderWidget } from "stores/Admin/Widget/state";
import { FormControlStep, FormLeft, LabelForm } from "./FormConfigStyle";

function FormLeftItem() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.TiktokWidgetReducer
  );
  const dispatch = useDispatch();
  const onSetConfig = (val: ISettingProviderWidget) => {
    dispatch(WidgetActionTS.OnSetSetting(val));
  };
  return (
    <FormLeft>
      <FormLayout>
        <FormControlStep>
          <LabelForm>
            <TextStyle>Header</TextStyle>
          </LabelForm>
          <ButtonGroup segmented>
            <Button
              pressed={widgetReducer.settings.header === "enable"}
              onClick={() => onSetConfig({ header: "enable" })}
            >
              Enable
            </Button>
            <Button
              pressed={widgetReducer.settings.header === "disable"}
              onClick={() => onSetConfig({ header: "disable" })}
            >
              Disable
            </Button>
          </ButtonGroup>
        </FormControlStep>
        <TextField
          name="title"
          id="title"
          label="Title"
          value={widgetReducer.settings.titleHeader}
          onChange={(val) => onSetConfig({ titleHeader: val })}
          placeholder="Title"
          autoComplete="off"
        />
        <TextField
          name="caption"
          id="caption"
          label="Caption"
          value={widgetReducer.settings.caption}
          onChange={(val) => onSetConfig({ caption: val })}
          placeholder="Caption"
          autoComplete="off"
        />
        <TextField
          name="read-more"
          id="read-more"
          label={'Label "Read more"'}
          value={widgetReducer.settings.labelReadMore}
          onChange={(val) => onSetConfig({ labelReadMore: val })}
          placeholder="Label Read more"
          autoComplete="off"
        />
        {widgetReducer.settings.layout !== TemplateType.Carousel &&
          widgetReducer.settings.layout !== TemplateType.Slider && (
            <TextField
              name="view-more"
              id="view-more"
              label="Label View more"
              value={widgetReducer.settings.labelView}
              onChange={(val) => onSetConfig({ labelView: val })}
              placeholder="Label View more"
              autoComplete="off"
            />
          )}
      </FormLayout>
    </FormLeft>
  );
}

export default FormLeftItem;
