import InstagramLayout from "Dependencies/InstagramLayout";
import {
  IInstagramDto,
  InstagramOption,
} from "Dependencies/InstagramLayout/InstagramLayoutModel";
import React from "react";
import { useSelector } from "react-redux";
import { GetVideoByJobRequest } from "repositories/dtos/requests/GetVideoByJobRequest";
import { InstagramReponsitory } from "repositories/implements/InstagramReponsitory";
import { RootReducer } from "stores/Admin/reducers";
import CircleLoading from "ui-components/CircleLoading";
import { LiveTemplateWrapper } from "./LiveTemplateStyle";

function LiveTemplates() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );

  const getInstagramStories = (pageIndex: number, showItems?: number) => {
    return new InstagramReponsitory().GetVideosByJob(
      new GetVideoByJobRequest(
        widgetReducer.settings.valueSource,
        widgetReducer.settings.source
      ),
      widgetReducer.settings.limitItems
    );
  };

  const onClick = (item: IInstagramDto) => () => {};
  return (
    <LiveTemplateWrapper>
      <InstagramLayout
        style={{
          height: "calc(100% - 44px)",
        }}
        option={new InstagramOption().ToDo(widgetReducer.settings)}
        _queryData={getInstagramStories}
        customLoader={<CircleLoading />}
        onClickItem={onClick}
        notLoadmore
        showLoadInfinite
        showPageFirst
      ></InstagramLayout>
    </LiveTemplateWrapper>
  );
}

export default LiveTemplates;
