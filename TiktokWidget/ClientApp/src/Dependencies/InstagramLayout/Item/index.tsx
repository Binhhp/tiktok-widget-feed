import React, { useState } from "react";
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
  const [load, setLoad] = useState(false);
  return (
    <ItemWrapper width={props.width}>
      <ItemIcon>
        {props.item.videoUrl ? (
          <IconMedia />
        ) : props.item.imageUrlArr && props.item.imageUrlArr.length > 0 ? (
          <IconGalarey />
        ) : (
          <></>
        )}
      </ItemIcon>
      <DivItemOrginal>
        <DivItemImage
          onLoad={() => setLoad(true)}
          cross-origin="anonymous"
          loading="lazy"
          src=""
          data-src={
            props.item.thumbnailUrl?.startsWith("http")
              ? props.item.thumbnailUrl
              : `data:image/png;base64,${props.item.thumbnailUrl}`
          }
          className={load ? "img-loaded" : "img-loading"}
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
