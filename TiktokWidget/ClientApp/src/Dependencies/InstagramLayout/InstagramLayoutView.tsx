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
  const templateContext = useContext(InstagramLayoutContext);
  const fetchData = () => {
    if (props.notLoadmore && templateContext.state.pageIndex > 1) return;
    props
      ._queryData(
        templateContext.state.pageIndex,
        props.option.numberPerRow * 2
      )
      .then((res) => {
        if (res?.data.length > 0) {
          templateContext.OnSetItems({
            count: res.count,
            items: res.data,
          });
        }
        setLoading(false);
      });
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
