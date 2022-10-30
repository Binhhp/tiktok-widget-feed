import React, { useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingInfinite from "ui-components/Loading/ButtonLoading";
import { InstagramLayoutContext } from "../InstagramLayoutContext";
import { IInstagramDto } from "../InstagramLayoutModel";
import { DivLayoutFlexbox } from "../InstagramLayoutStyle";
import Item from "../Item";
import { ListProps } from "./ListModel";
import { ButtonLoadmore, DivLoadmore, ListWrapper } from "./ListStyle";

function ListInstagram(props: ListProps) {
  const templateContext = useContext(InstagramLayoutContext);
  const items: IInstagramDto[] = props.showPageFirst
    ? props.items.slice(0, props.option.numberPerRow * 2)
    : props.items;

  return props.option.labelLoadmore ? (
    <ListWrapper>
      <DivLayoutFlexbox>
        {items.map((item) => (
          <Item
            key={`list-${item.id}`}
            onClick={props.onClick}
            option={props.option}
            item={item}
            width={100 / props.option.numberPerRow}
          ></Item>
        ))}
      </DivLayoutFlexbox>
      <DivLoadmore>
        {props.items.length < templateContext.state.count && (
          <LoadingInfinite
            customButton={
              <ButtonLoadmore
                onClick={props.onLoadmore}
                bg={props.option.loadMoreBackground}
              >
                {props.option.labelLoadmore}
              </ButtonLoadmore>
            }
            loading={props.loading}
            viewMore={props.option.labelLoadmore}
            color={props.option.loadMoreBackground}
          ></LoadingInfinite>
        )}
      </DivLoadmore>
    </ListWrapper>
  ) : (
    <InfiniteScroll
      dataLength={templateContext.state.items.length}
      hasMore={
        props.showLoadInfinite
          ? true
          : templateContext.state.items.length < templateContext.state.count
      }
      loader={
        <LoadingInfinite
          color={props.option.loadMoreBackground}
        ></LoadingInfinite>
      }
      next={props.onLoadmore}
    >
      <ListWrapper>
        <DivLayoutFlexbox>
          {items.map((item) => (
            <Item
              key={`list-${item.id}`}
              onClick={props.onClick}
              option={props.option}
              item={item}
              width={100 / props.option.numberPerRow}
            ></Item>
          ))}
        </DivLayoutFlexbox>
      </ListWrapper>
    </InfiniteScroll>
  );
}

export default React.memo(ListInstagram);
