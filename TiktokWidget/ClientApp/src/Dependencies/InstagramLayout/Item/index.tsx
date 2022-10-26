import React from "react";
import { IItemProps } from "./ItemModel";
import {
  DivItemContent,
  DivItemContentContract,
  DivItemContentContractItem,
  DivItemDesc,
  DivItemIcon,
  DivItemImage,
  DivItemOrginal,
  ItemIcon,
  ItemWrapper,
} from "./ItemStyle";
import { NumberFormatter } from "common/functions/NumberFormatter";
import { ItemShowAs } from "../InstagramLayoutModel";
import { IconComment, IconGalarey, IconHeart, IconMedia } from "../Icons";

function Item(props: IItemProps) {
  return (
    <ItemWrapper width={props.width}>
      {props.option.showNetworkIcon &&
        props.showAs !== ItemShowAs.SingleImage && (
          <ItemIcon>
            {props.showAs === ItemShowAs.MultipleImage ? (
              <IconGalarey />
            ) : (
              <IconMedia />
            )}
          </ItemIcon>
        )}
      <DivItemOrginal>
        <DivItemImage src={props.item.image} alt={props.item.desc} />
      </DivItemOrginal>
      <DivItemContent
        onClick={props.onClick && props.onClick(props.item)}
        bg={props.option.itemBackground}
      >
        <DivItemContentContract>
          <DivItemContentContractItem color={props.option.itemColor}>
            <DivItemIcon>
              <IconHeart color={props.option.itemColor} />
            </DivItemIcon>
            <span>{NumberFormatter.Format(props.item.stats?.diggCount)}</span>
          </DivItemContentContractItem>
          <DivItemContentContractItem color={props.option.itemColor}>
            <DivItemIcon>
              <IconComment color={props.option.itemColor} />
            </DivItemIcon>
            <span>
              {NumberFormatter.Format(props.item.stats?.commentCount)}
            </span>
          </DivItemContentContractItem>
        </DivItemContentContract>
        <DivItemDesc color={props.option.itemColor}>
          <p className="orichi-instagram-desc">{props.item.desc?.trimEnd()}</p>
          <span className="orichi-instagram-readmore">
            ...&nbsp;{props.option.labelReadMore ?? "read more"}
          </span>
        </DivItemDesc>
      </DivItemContent>
    </ItemWrapper>
  );
}

export default Item;
