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
      <ItemIcon>
        {props.item.videoUrl ? (
          <IconMedia />
        ) : props.item.imageUrlArr ? (
          <IconGalarey />
        ) : (
          <></>
        )}
      </ItemIcon>
      <DivItemOrginal>
        <DivItemImage
          cross-origin="anonymous"
          loading="lazy"
          src={
            props.item.thumbnailUrl?.startsWith("http")
              ? props.item.thumbnailUrl
              : `data:image/png;base64,${props.item.thumbnailUrl}`
          }
          alt={props.item.description}
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
            <span>{NumberFormatter.Format(props.item.likeCount)}</span>
          </DivItemContentContractItem>
          <DivItemContentContractItem color={props.option.itemColor}>
            <DivItemIcon>
              <IconComment color={props.option.itemColor} />
            </DivItemIcon>
            <span>{NumberFormatter.Format(props.item.commentCount)}</span>
          </DivItemContentContractItem>
        </DivItemContentContract>
        <DivItemDesc color={props.option.itemColor}>
          <p className="orichi-instagram-desc">
            {props.item.description?.trimEnd()}
          </p>
          <span className="orichi-instagram-readmore">
            ...&nbsp;{props.option.labelReadMore ?? "read more"}
          </span>
        </DivItemDesc>
      </DivItemContent>
    </ItemWrapper>
  );
}

export default Item;
