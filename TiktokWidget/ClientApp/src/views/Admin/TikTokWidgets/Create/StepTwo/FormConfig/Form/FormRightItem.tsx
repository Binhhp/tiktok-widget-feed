import { RadioButton, TextField, TextStyle } from "@shopify/polaris";
import ColorPickerWidget from "Dependencies/ColorPicker";
import { TemplateType } from "Dependencies/LayoutTemplate/LayoutTemplateType";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import { WidgetActionTS } from "stores/Admin/Widget/action";
import {
  FormControlStep,
  FormRight,
  FormRightWrapper,
  InputForm,
  LabelForm,
  RadioForm,
} from "./FormConfigStyle";

function FormRightItem() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.TiktokWidgetReducer
  );
  const dispatch = useDispatch();
  const onSetNumberRow = (val: string) => {
    if (val === "0") return;
    const numberItemPerRow = parseInt(val);
    if (numberItemPerRow > 15 || numberItemPerRow < 0) return;
    return dispatch(
      WidgetActionTS.OnSetSetting({ numberItemPerRow: parseInt(val) })
    );
  };

  const onChooseRadio = (
    value: string,
    key: "showProfile" | "showNetworkIcon"
  ) => {
    if (key === "showProfile") {
      dispatch(
        WidgetActionTS.OnSetSetting({
          showProfile: value === "profile-enable" ? "enable" : "disable",
        })
      );
    }
    if (key === "showNetworkIcon") {
      dispatch(
        WidgetActionTS.OnSetSetting({
          showNetworkIcon:
            value === "network-icon-enable" ? "enable" : "disable",
        })
      );
    }
  };

  const handleColorChange = (color: string, type: string) => {
    const val = color === undefined ? "#ffffff" : color;
    if (type === "accentColor")
      return dispatch(
        WidgetActionTS.OnSetSetting({
          accentColor: val,
        })
      );

    if (type === "itemColor")
      return dispatch(
        WidgetActionTS.OnSetSetting({
          itemColor: val,
        })
      );
    if (type === "itemBackground")
      return dispatch(
        WidgetActionTS.OnSetSetting({
          itemBackground: val,
        })
      );
  };

  return (
    <FormRight>
      <FormRightWrapper>
        {widgetReducer.settings.source === 1 && (
          <FormControlStep>
            <LabelForm>
              <TextStyle>Show Profile</TextStyle>
            </LabelForm>
            <FormControlStep>
              <RadioForm mr={10}>
                <RadioButton
                  label="Enable"
                  checked={widgetReducer.settings.showProfile === "enable"}
                  id="profile-enable"
                  name="profile"
                  onChange={(_checked: boolean, value: string) =>
                    onChooseRadio(value, "showProfile")
                  }
                />
              </RadioForm>
              <RadioForm>
                <RadioButton
                  label="Disable"
                  checked={widgetReducer.settings.showProfile === "disable"}
                  id="profile-disable"
                  name="profile"
                  onChange={(_checked: boolean, value: string) =>
                    onChooseRadio(value, "showProfile")
                  }
                />
              </RadioForm>
            </FormControlStep>
          </FormControlStep>
        )}
        <FormControlStep>
          <LabelForm>
            <TextStyle>Show Network Icon</TextStyle>
          </LabelForm>
          <FormControlStep>
            <RadioForm mr={10}>
              <RadioButton
                label="Enable"
                checked={widgetReducer.settings.showNetworkIcon === "enable"}
                name="network-icon"
                id="network-icon-enable"
                onChange={(_checked: boolean, value: string) =>
                  onChooseRadio(value, "showNetworkIcon")
                }
              />
            </RadioForm>
            <RadioForm>
              <RadioButton
                label="Disable"
                checked={widgetReducer.settings.showNetworkIcon === "disable"}
                name="network-icon"
                id="network-icon-disable"
                onChange={(_checked: boolean, value: string) =>
                  onChooseRadio(value, "showNetworkIcon")
                }
              />
            </RadioForm>
          </FormControlStep>
        </FormControlStep>
        <FormControlStep>
          <LabelForm>
            <TextStyle>Accent Color</TextStyle>
          </LabelForm>
          <InputForm>
            <ColorPickerWidget
              type="accentColor"
              onChange={handleColorChange}
              color={widgetReducer.settings.accentColor}
            />
          </InputForm>
        </FormControlStep>
        {widgetReducer.settings.layout !== TemplateType.List && (
          <FormControlStep>
            <LabelForm>
              <TextStyle>Item Background</TextStyle>
            </LabelForm>
            <InputForm>
              <ColorPickerWidget
                type="itemBackground"
                onChange={handleColorChange}
                color={widgetReducer.settings.itemBackground}
              />
            </InputForm>
          </FormControlStep>
        )}
        <FormControlStep>
          <LabelForm>
            <TextStyle>Item color</TextStyle>
          </LabelForm>
          <InputForm>
            <ColorPickerWidget
              type="itemColor"
              onChange={handleColorChange}
              color={widgetReducer.settings.itemColor}
            />
          </InputForm>
        </FormControlStep>
        {widgetReducer.settings.layout !== TemplateType.Slider &&
          widgetReducer.settings.layout !== TemplateType.Carousel && (
            <FormControlStep style={{ alignItems: "flex-start" }}>
              <LabelForm>
                <TextStyle>Number item per row</TextStyle>
              </LabelForm>
              <InputForm>
                <TextField
                  name="number-item"
                  id="number-item"
                  label=""
                  helpText="Max number item per row is 15 and min is 0"
                  type="number"
                  value={String(widgetReducer.settings.numberItemPerRow)}
                  onChange={onSetNumberRow}
                  placeholder="Number item"
                  autoComplete="off"
                />
              </InputForm>
            </FormControlStep>
          )}
      </FormRightWrapper>
    </FormRight>
  );
}

export default FormRightItem;
