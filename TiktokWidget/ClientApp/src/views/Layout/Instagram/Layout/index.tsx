import React from "react";
import InstagramLayout from "Dependencies/InstagramLayout";
import { InstagramReponsitory } from "repositories/implements/InstagramReponsitory";
import { BaseInstagramWidget } from "repositories/dtos/responses/BaseInstagramWidget";
import { InstagramOption } from "Dependencies/InstagramLayout/InstagramLayoutModel";
import { InstagramLayoutWrapper } from "./LayoutStyle";

interface ILayoutProps {
  widget: BaseInstagramWidget;
}
function Layout(props: ILayoutProps) {
  const getInstagramStories = (pageIndex: number, showItems?: number) => {
    return new InstagramReponsitory().GetVideos(
      props.widget.id ?? "",
      pageIndex,
      showItems
    );
  };

  return (
    <InstagramLayoutWrapper>
      <InstagramLayout
        disableContext
        option={new InstagramOption(props.widget)}
        _queryData={getInstagramStories}
      ></InstagramLayout>
    </InstagramLayoutWrapper>
  );
}

export default React.memo(Layout);
