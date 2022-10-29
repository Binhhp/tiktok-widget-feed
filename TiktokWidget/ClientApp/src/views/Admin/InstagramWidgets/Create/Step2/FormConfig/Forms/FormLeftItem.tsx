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
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
import {
  IInstagramWidget,
  TemplateInstagramType,
} from "stores/Admin/InstagramWidget/state";
import { RootReducer } from "stores/Admin/reducers";
import { FormControlStep, FormLeft, LabelForm } from "./FormConfigStyle";

function FormLeftItem() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );
  const dispatch = useDispatch();
  const onSetConfig = (val: IInstagramWidget) => {
    dispatch(InstagramWidgetActionTS.OnSetSetting(val));
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
        {widgetReducer.settings.header === "enable" && (
          <TextField
            name="title"
            id="title"
            label="Title"
            value={widgetReducer.settings.titleHeader}
            onChange={(val) => onSetConfig({ titleHeader: val })}
            placeholder="Title"
            autoComplete="off"
          />
        )}
        <TextField
          name="read-more"
          id="read-more"
          label={'Label "Read more"'}
          value={widgetReducer.settings.labelReadMore}
          onChange={(val) => onSetConfig({ labelReadMore: val })}
          placeholder="Label Read more"
          autoComplete="off"
        />
        {widgetReducer.settings.layout === TemplateInstagramType.List && (
          <TextField
            name="load-more"
            id="load-more"
            label={'Label "Load more"'}
            value={widgetReducer.settings.labelLoadMore}
            onChange={(val) => onSetConfig({ labelLoadMore: val })}
            placeholder="Label Load more"
            autoComplete="off"
          />
        )}
      </FormLayout>
    </FormLeft>
  );
}

export default FormLeftItem;
