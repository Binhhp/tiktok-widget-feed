import {
  FormLayout,
  RadioButton,
  TextField,
  TextStyle,
} from "@shopify/polaris";
import ColorPickerWidget from "Dependencies/ColorPicker";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
import { TemplateInstagramType } from "stores/Admin/InstagramWidget/state";
import { RootReducer } from "stores/Admin/reducers";
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
    (state: RootReducer) => state.InstagramWidgetReducer
  );
  const dispatch = useDispatch();
  const onSetNumberRow = (val: string) => {
    const value = parseInt(val);
    if (!value) {
      return dispatch(
        InstagramWidgetActionTS.OnSetSetting({ numberItemPerRow: 0 })
      );
    }
    if (value > 15 || value < 0 || value === 0) return;
    return dispatch(
      InstagramWidgetActionTS.OnSetSetting({ numberItemPerRow: parseInt(val) })
    );
  };

  const onSetLimitItem = (val: string) => {
    const value = parseInt(val);
    if (!value) {
      return dispatch(InstagramWidgetActionTS.OnSetSetting({ limitItems: 1 }));
    }
    if (value < 0 || value === 0) return;
    return dispatch(
      InstagramWidgetActionTS.OnSetSetting({ limitItems: parseInt(val) })
    );
  };

  const onChooseRadio = (value: string) => {
    dispatch(
      InstagramWidgetActionTS.OnSetSetting({
        showNetworkIcon: value === "network-icon-enable" ? "enable" : "disable",
      })
    );
  };

  const handleColorChange = (color: string, type: string) => {
    const val = color === undefined ? "#ffffff" : color;
    if (type === "loadMoreBackGround")
      return dispatch(
        InstagramWidgetActionTS.OnSetSetting({
          loadMoreBackground: val,
        })
      );

    if (type === "itemColor")
      return dispatch(
        InstagramWidgetActionTS.OnSetSetting({
          itemColor: val,
        })
      );
    if (type === "itemBackground")
      return dispatch(
        InstagramWidgetActionTS.OnSetSetting({
          itemBackground: val,
        })
      );
  };

  return (
    <FormRight>
      <FormRightWrapper>
        <FormLayout>
          {widgetReducer.settings.header === "enable" &&
            widgetReducer.settings.titleHeader && (
              <FormControlStep>
                <LabelForm>
                  <TextStyle>Show Network Icon</TextStyle>
                </LabelForm>
                <FormControlStep>
                  <RadioForm mr={10}>
                    <RadioButton
                      label="Enable"
                      checked={
                        widgetReducer.settings.showNetworkIcon === "enable"
                      }
                      name="network-icon"
                      id="network-icon-enable"
                      onChange={(_checked: boolean, value: string) =>
                        onChooseRadio(value)
                      }
                    />
                  </RadioForm>
                  <RadioForm>
                    <RadioButton
                      label="Disable"
                      checked={
                        widgetReducer.settings.showNetworkIcon === "disable"
                      }
                      name="network-icon"
                      id="network-icon-disable"
                      onChange={(_checked: boolean, value: string) =>
                        onChooseRadio(value)
                      }
                    />
                  </RadioForm>
                </FormControlStep>
              </FormControlStep>
            )}
          {widgetReducer.settings.layout === TemplateInstagramType.List && (
            <FormControlStep>
              <LabelForm>
                <TextStyle>"Load more" background</TextStyle>
              </LabelForm>
              <InputForm>
                <ColorPickerWidget
                  type="loadMoreBackGround"
                  onChange={handleColorChange}
                  color={widgetReducer.settings.loadMoreBackground}
                />
              </InputForm>
            </FormControlStep>
          )}
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
          <FormControlStep style={{ alignItems: "flex-start" }}>
            <LabelForm>
              <TextStyle>Number item per row</TextStyle>
            </LabelForm>
            <InputForm>
              <TextField
                name="number-item"
                id="number-item"
                label=""
                type="number"
                value={String(widgetReducer.settings.numberItemPerRow)}
                onChange={onSetNumberRow}
                placeholder="Number item"
                autoComplete="off"
              />
            </InputForm>
          </FormControlStep>
          <FormControlStep style={{ alignItems: "flex-start" }}>
            <LabelForm>
              <TextStyle>Limit Items</TextStyle>
            </LabelForm>
            <InputForm>
              <TextField
                name="limit-item"
                id="limit-item"
                label=""
                type="number"
                value={String(widgetReducer.settings.limitItems)}
                onChange={onSetLimitItem}
                placeholder="Limit item"
                autoComplete="off"
              />
            </InputForm>
          </FormControlStep>
        </FormLayout>
      </FormRightWrapper>
    </FormRight>
  );
}

export default FormRightItem;
