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
import { IconComment, IconGalarey, IconHeart, IconMedia } from "../Icons";

function Item(props: IItemProps) {
  return (
    <ItemWrapper width={props.width}>
      {props.option.showNetworkIcon && (
        <ItemIcon>
          {props.item.video ? (
            <IconMedia />
          ) : props.item.images.length > 1 ? (
            <IconGalarey />
          ) : (
            <></>
          )}
        </ItemIcon>
      )}
      <DivItemOrginal>
        <DivItemImage
          loading="lazy"
          src={props.item.images[0]}
          alt={props.item.desc}
        />
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
