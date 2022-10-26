import React, { useContext } from "react";
import { InstagramLayoutContext } from "../InstagramLayoutContext";
import { DivLayoutFlexbox } from "../InstagramLayoutStyle";
import Item from "../Item";
import { ListProps } from "./ListModel";
import { ButtonLoadmore, DivLoadmore, ListWrapper } from "./ListStyle";

function ListInstagram(props: ListProps) {
  const templateContext = useContext(InstagramLayoutContext);
  return (
    <ListWrapper>
      <DivLayoutFlexbox>
        {props.items
          .slice(
            0,
            props.option.numberPerRow *
              2 *
              (templateContext.state.pageIndex - 1)
          )
          .map((item, index) => (
            <Item
              key={`list-${index}`}
              onClick={props.onClick}
              option={props.option}
              item={item}
              showAs={item.showAs}
              width={100 / props.option.numberPerRow}
            ></Item>
          ))}
      </DivLayoutFlexbox>
      <DivLoadmore>
        <ButtonLoadmore bg={props.option.loadMoreBackground}>
          {props.option.labelLoadmore}
        </ButtonLoadmore>
      </DivLoadmore>
    </ListWrapper>
  );
}

export default React.memo(ListInstagram);
