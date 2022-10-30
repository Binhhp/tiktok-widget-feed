import React, { useContext, useEffect, useState } from "react";
import { TemplateInstagramType } from "stores/Admin/InstagramWidget/state";
import { IconInstagram } from "./Icons";
import { InstagramLayoutContext } from "./InstagramLayoutContext";
import { IInstagramLayoutView } from "./InstagramLayoutModel";
import {
  DivIcon,
  DivTitle,
  DivTitleContent,
  InstagramLayoutContainer,
} from "./InstagramLayoutStyle";
import ListInstagram from "./List";
import SliderInstagram from "./Slider";

function InstagramLayoutView(props: IInstagramLayoutView) {
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const templateContext = useContext(InstagramLayoutContext);
  const fetchData = async () => {
    if (props.notLoadmore && templateContext.state.pageIndex > 1) return;
    if (templateContext.state.items.length > 0) {
      setLoadingButton(true);
    }
    const res = await props._queryData(
      templateContext.state.pageIndex,
      props.option.numberPerRow * 2
    );
    if (res?.data.length > 0) {
      templateContext.OnSetItems({
        count: res.count,
        items: res.data,
      });
    }
    setLoading(false);
    setLoadingButton(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    props.customLoader ? (
      props.customLoader
    ) : (
      <></>
    )
  ) : (
    <InstagramLayoutContainer>
      {props.option.title && props.option.header && (
        <DivTitle>
          <DivIcon>
            <IconInstagram />
          </DivIcon>
          <DivTitleContent>{props.option.title}</DivTitleContent>
        </DivTitle>
      )}
      {props.option.type === TemplateInstagramType.Slider ? (
        <SliderInstagram
          items={templateContext.state.items}
          onClick={props.onClickItem}
          option={props.option}
        />
      ) : (
        <ListInstagram
          loading={loadingButton}
          items={templateContext.state.items}
          onClick={props.onClickItem}
          option={props.option}
          onLoadmore={fetchData}
          showLoadInfinite={props.showLoadInfinite}
          showPageFirst={props.showPageFirst}
        />
      )}
    </InstagramLayoutContainer>
  );
}

export default InstagramLayoutView;
