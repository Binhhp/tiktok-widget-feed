import React, { useState } from "react";
import InstagramLayout from "Dependencies/InstagramLayout";
import { InstagramWidgetResponse } from "repositories/dtos/responses/InstagramWidgetResponse";
import {
  IInstagramDto,
  InstagramOption,
} from "Dependencies/InstagramLayout/InstagramLayoutModel";
import { InstagramLayoutWrapper } from "./LayoutStyle";
import Detail from "../Detail";
import InstagramWidgetAPI from "repositories/implements/InstagramWidgetAPI";
interface ILayoutProps {
  widget: InstagramWidgetResponse;
}
function Layout(props: ILayoutProps) {
  const getInstagramStories = (pageIndex: number, showItems?: number) => {
    const showAsItems =
      props.widget.setting.layoutType === 2
        ? window.innerWidth > 1200
          ? showItems
          : 4
        : props.widget.setting.limitItems;
    return InstagramWidgetAPI.GetVideos(
      props.widget.id ?? "",
      pageIndex,
      showAsItems
    );
  };

  const [item, setItem] = useState<IInstagramDto | undefined>(undefined);
  const onClickItem = (item?: IInstagramDto) => () => {
    setItem(item);
    InstagramWidgetAPI.PostClick(props.widget.id, {
      PostId: item?.id,
      Image: item?.thumbnailUrl,
      Description: item?.description,
    });
  };
  return (
    <InstagramLayoutWrapper>
      <InstagramLayout
        option={new InstagramOption(props.widget)}
        _queryData={getInstagramStories}
        onClickItem={onClickItem}
      ></InstagramLayout>
      {item && (
        <Detail
          widget={props.widget}
          item={item}
          onExit={() => setItem(undefined)}
        />
      )}
    </InstagramLayoutWrapper>
  );
}

export default React.memo(Layout);
