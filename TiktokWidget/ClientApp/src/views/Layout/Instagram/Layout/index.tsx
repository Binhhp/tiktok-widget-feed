import React, { useState } from "react";
import InstagramLayout from "Dependencies/InstagramLayout";
import { InstagramReponsitory } from "repositories/implements/InstagramReponsitory";
import { BaseInstagramWidget } from "repositories/dtos/responses/BaseInstagramWidget";
import {
  IInstagramDto,
  InstagramOption,
} from "Dependencies/InstagramLayout/InstagramLayoutModel";
import { InstagramLayoutWrapper } from "./LayoutStyle";
import Detail from "../Detail";

interface ILayoutProps {
  widget: BaseInstagramWidget;
}
function Layout(props: ILayoutProps) {
  const getInstagramStories = (pageIndex: number, showItems?: number) => {
    const showAsItems =
      props.widget.setting.layoutType === 2
        ? showItems
        : props.widget.setting.limitItems;
    return new InstagramReponsitory().GetVideos(
      props.widget.id ?? "",
      pageIndex,
      showAsItems
    );
  };

  const [item, setItem] = useState<IInstagramDto | undefined>(undefined);
  const onClickItem = (item?: IInstagramDto) => () => setItem(item);
  return (
    <InstagramLayoutWrapper>
      <InstagramLayout
        disableContext
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
