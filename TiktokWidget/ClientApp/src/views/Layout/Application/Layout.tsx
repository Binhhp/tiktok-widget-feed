import React from "react";
import { TemplateStoreActionTS } from "stores/Templates/action";
import Template from "Dependencies/LayoutTemplate";
import { TemplateType } from "Dependencies/LayoutTemplate/LayoutTemplateType";
import { WidgetReponsitory } from "repositories/implements/WidgetReponsitory";
import { useDispatch } from "react-redux";
import { ISettingProviderWidget } from "stores/Widget/state";

interface LayoutProps {
  id: string;
  widget: ISettingProviderWidget;
}
export default function Layout(props: LayoutProps) {
  const dispatch = useDispatch();
  const fetchData = (pageIndex: number) => {
    return new WidgetReponsitory().GetVideos(props.id ?? "", pageIndex);
  };

  const onOpenVideo = (index: number) => {
    dispatch(
      TemplateStoreActionTS.OnActiveItem(props.id, {
        active: true,
        realIndex: index,
      })
    );
  };
  return (
    <Template
      id={`${props.id}`}
      clickRender={onOpenVideo}
      enableHover={true}
      options={{
        readMore: props.widget.labelReadMore,
        bg: props.widget.itemBackground,
        color: props.widget.itemColor,
        showNetworkIcon: props.widget.showNetworkIcon,
        accentColor: props.widget.accentColor,
        viewMore: props.widget.labelView,
      }}
      imgHeight={props.widget.layout === TemplateType.Slider ? 400 : 0}
      contentOverflow={props.widget.layout === TemplateType.List}
      row={props.widget.numberItemPerRow}
      type={props.widget.layout ?? TemplateType.Slider}
      _queryData={fetchData}
    ></Template>
  );
}
