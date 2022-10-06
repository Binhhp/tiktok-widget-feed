import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "stores/reducers";
import { WidgetActionTS } from "stores/Widget/action";
import { TemplateType } from "Dependencies/LayoutTemplate/LayoutTemplateType";
import { TemplateModel } from "../StepTwoType";
import {
  TemplateItem,
  TemplateItemImage,
  TemplateSettingWrapper,
  TextTemplate,
} from "./PatternStyle";

interface ITemplateSettingsProps {
  style?: {
    marginTopParent?: number;
    marginItem?: number;
    height?: number;
  };
}
function TemplateSettings(props: ITemplateSettingsProps) {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.widgetReducer
  );
  const dispatch = useDispatch();
  const onSetLayout = (key: TemplateType) => () => {
    dispatch(
      WidgetActionTS.OnSetSetting({
        layout: key,
      })
    );
  };
  return (
    <TemplateSettingWrapper marginTop={props?.style?.marginTopParent}>
      {TemplateModel.layouts.map((item, index) => (
        <TemplateItem
          height={props?.style?.height}
          margin={props?.style?.marginItem}
          key={index}
          onClick={onSetLayout(item.key)}
          isActive={widgetReducer.settings.layout === item.key}
        >
          <TemplateItemImage width={item?.width}>
            <img src={item.image} alt="slider" />
          </TemplateItemImage>
          <TextTemplate>
            <span>{item.title}</span>
          </TextTemplate>
        </TemplateItem>
      ))}
    </TemplateSettingWrapper>
  );
}

export default TemplateSettings;
