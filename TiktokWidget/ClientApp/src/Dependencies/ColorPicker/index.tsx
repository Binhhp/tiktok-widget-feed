import { TextField } from "@shopify/polaris";
import { ButtonCustom } from "common/style/Utils.style";
import { useOutsideAlerter } from "hooks";
import React, { useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { IColorPickerWidget } from "./ColorPickerModel";
import {
  ColorPickerMain,
  ColorPickerSection,
  ColorPickerWrapper,
  ExpandColor,
} from "./ColorPickerStyle";

function ColorPickerWidget(props: IColorPickerWidget) {
  const [active, setActive] = useState(false);
  const type = props.type;
  const onChangeInputColor = (val: string) => {
    if (val.length > 9) return;
    props.onChange(val, type);
  };

  const onActive = () => {
    setActive(!active);
  };
  const onCloseActive = () => {
    setActive(false);
  };
  const onBlurInputColor = () => {
    if (props.color === "") props.onChange("#ffffff", type);
  };

  const newColor = (newColor: string) => props.onChange(newColor, type);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onCloseActive);
  return (
    <ColorPickerMain>
      {active ? (
        <ColorPickerWrapper>
          <ColorPickerSection ref={wrapperRef}>
            <HexColorPicker
              className="color-picker"
              color={props.color}
              onChange={newColor}
            />
          </ColorPickerSection>
          <ColorPickerSection>
            <TextField
              label=""
              placeholder="Hex color"
              autoComplete="0"
              value={props.color}
              onBlur={onBlurInputColor}
              onChange={onChangeInputColor}
            />
          </ColorPickerSection>
        </ColorPickerWrapper>
      ) : (
        <></>
      )}
      <ButtonCustom
        width={100}
        size="small"
        bg="#ffffff"
        color="black"
        borderColor="rgba(186, 191, 195, 1)"
        onClick={onActive}
      >
        <ExpandColor bg={props.color}></ExpandColor>
        <span>{props.color}</span>
      </ButtonCustom>
    </ColorPickerMain>
  );
}

export default ColorPickerWidget;
