import React, { useCallback } from "react";
import { TemplateModel } from "views/Admin/TikTokWidgets/Create/Step2/StepTwoType";
import { TemplateModel as TemplateModelInstagram } from "views/Admin/InstagramWidgets/Create/Step2/Step2Model";
import { WidgetType } from "../../../OnBoardingModel";
import { TemplateWidgetContainer } from "./styled";
import { TemplateType } from "Dependencies/TikTokLayout/LayoutTemplateType";

export default function TemplateWidget(props: TemplateWidgetProps) {
  const templates = useCallback(
    () =>
      props.widgetType === WidgetType.Tiktok
        ? TemplateModel.layouts
            .filter(
              (x) =>
                x.key === TemplateType.List || x.key === TemplateType.Carousel
            )
            .reverse()
        : TemplateModelInstagram.layouts,
    []
  );

  return (
    <TemplateWidgetContainer>
      <h2 className="header">Widget Settings</h2>
      <div className="menu-items">
        {templates().map((x) => (
          <div
            onClick={props.onSetTemplate(x.key)}
            className={props.template === x.key ? "item active" : "item"}
            key={x.key}
          >
            <div className="item-header">
              <span>{x.title}</span>
            </div>
            <div className="item-img">
              <img src={x.image} alt={x.title} />
            </div>
          </div>
        ))}
      </div>
    </TemplateWidgetContainer>
  );
}

interface TemplateWidgetProps {
  widgetType: WidgetType;
  template: number;
  onSetTemplate: (template: number) => () => void;
}
