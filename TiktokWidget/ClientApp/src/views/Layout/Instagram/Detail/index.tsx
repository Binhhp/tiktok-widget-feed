import { DateTimeFormatter } from "common/functions/DateTimeFormat";
import SliderImage from "Dependencies/InstagramLayout/Components/SliderImage";
import { IconInstagram } from "Dependencies/InstagramLayout/Icons";
import { IInstagramDto } from "Dependencies/InstagramLayout/InstagramLayoutModel";
import { useOutsideAlerter } from "hooks";
import React, { useRef } from "react";
import { BaseInstagramWidget } from "repositories/dtos/responses/BaseInstagramWidget";
import ShopTagProduct from "../ShopTagProduct";
import {
  DivContainer,
  DivContent,
  DivDesc,
  DivDetailWrapper,
  DivDot,
  DivTimezone,
  DivTimezoneContent,
  DivUserName,
} from "./DetailStyle";

interface IDetailProps {
  item: IInstagramDto;
  widget: BaseInstagramWidget;
  onExit: () => void;
}
function Detail(props: IDetailProps) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.onExit);
  return (
    <DivDetailWrapper>
      <DivContainer ref={wrapperRef}>
        <DivContent>
          <SliderImage desc={props.item.desc} images={[props.item.image]} />
        </DivContent>
        <DivDesc>
          <div className="orichi-instagram-item">
            <DivUserName>
              <IconInstagram />
              <h2>{props.item.author}</h2>
              <DivDot color={props.widget.setting.itemColor}></DivDot>
              <a href="https://www.instagram.com/">Follow</a>
            </DivUserName>
            <p className="orichi-instagram-desc">{props.item.desc}</p>
          </div>
          <div className="orichi-instagram-item">
            <ShopTagProduct product={props.widget.products[0]} />
            <DivTimezone>
              <DivTimezoneContent color={props.widget.setting.itemColor}>
                <h2>
                  {DateTimeFormatter.onFormatDateUTC(props.item.createTime)}
                </h2>
                <DivDot bg="#888888"></DivDot>
                <h3>View on Instagram</h3>
              </DivTimezoneContent>
            </DivTimezone>
          </div>
        </DivDesc>
      </DivContainer>
    </DivDetailWrapper>
  );
}

export default Detail;
