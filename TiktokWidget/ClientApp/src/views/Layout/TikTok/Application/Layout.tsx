import React, { useContext } from "react";
import Template from "Dependencies/TikTokLayout";
import { TemplateType } from "Dependencies/TikTokLayout/LayoutTemplateType";
import { WidgetReponsitory } from "repositories/implements/WidgetReponsitory";
import { LayoutTemplateContext } from "Dependencies/TikTokLayout/LayoutTemplateContext";
import { AudioPlayerContext } from "../SwiperAudioPlayer/AudioPlayerContext";
import { ISettingProviderWidget } from "stores/Admin/Widget/state";

interface LayoutProps {
  id: string;
  widget: ISettingProviderWidget;
}
function Layout(props: LayoutProps) {
  const templateContext = useContext(LayoutTemplateContext);
  const audioPlayerContext = useContext(AudioPlayerContext);
  const fetchData = (pageIndex: number, showItems?: number) => {
    return new WidgetReponsitory().GetVideos(
      props.id ?? "",
      pageIndex,
      showItems
    );
  };

  const onOpenVideo = (index: number) => {
    templateContext.OnActiveItem({
      realIndex: index,
      active: true,
    });

    if (index === 0) {
      const videoId = templateContext.state.items[index].id;
      audioPlayerContext.handleVideoClick(videoId);
    }
  };
  return (
    <Template
      disableContext
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

export default React.memo(Layout);
