import { TemplateType } from "Dependencies/LayoutTemplate/LayoutTemplateType";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
import { RootReducer } from "stores/Admin/reducers";
import { Caption } from "../../CreateWidgetStyle";
import FormSubmit from "../FormConfig/Forms/FormSubmit";
import { TemplateModel } from "../Step2Model";
import { TemplateSectionWrapper } from "../Step2Style";
import {
  TemplateContainer,
  TemplateItem,
  TemplateItemImage,
  TemplateLayoutWrapper,
  TextTemplate,
} from "./PatternStyle";

function TemplateSelect() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );
  const dispatch = useDispatch();

  const onSetLayout = (key: TemplateType) => () => {
    dispatch(
      InstagramWidgetActionTS.OnSetSetting({
        layout:
          key === TemplateType.Slider ? TemplateType.Slider : TemplateType.List,
      })
    );
  };
  return (
    <TemplateSectionWrapper>
      <TemplateLayoutWrapper>
        <Caption>Step 2: Select a template</Caption>
        <TemplateContainer>
          {TemplateModel.layouts.map((item, index) => (
            <TemplateItem
              key={index}
              onClick={onSetLayout(item.key)}
              isActive={widgetReducer.settings.layout === item.key}
            >
              <TemplateItemImage width={item?.width}>
                <img src={item.image} alt={item.title} />
              </TemplateItemImage>
              <TextTemplate>
                <span>{item.title}</span>
              </TextTemplate>
            </TemplateItem>
          ))}
        </TemplateContainer>
      </TemplateLayoutWrapper>
      <FormSubmit></FormSubmit>
    </TemplateSectionWrapper>
  );
}

export default TemplateSelect;
