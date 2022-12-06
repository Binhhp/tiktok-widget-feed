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
import { UriProvider } from "common/functions/FuncUtils";
import config from "config";

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
          data-src={UriProvider.FormatURLImage(
            props.item.thumbnailUrl,
            config.CORS_PROXY,
            true
          )}
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
          <p className="orichi-instagram-desc" id="desctt">
            {props.item.description?.trimEnd()}
          </p>
          {props.item.description.length > 230 &&
            props.option.labelReadMore && (
              <span className="orichi-instagram-readmore">
                ...{props.option.labelReadMore}
              </span>
            )}
        </DivItemDesc>
      </DivItemContent>
    </ItemWrapper>
  );
}

export default Item;
