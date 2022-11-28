import SliderImage from "Dependencies/SliderImage";
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
import VideoPlayer from "Dependencies/VideoPlayer";

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
        <div className="orichi-instagram-user">
          <DivUserName>
            {props.widget.setting.showNetworkIcon && <IconInstagram />}
            <h2>{props.item?.user?.name}</h2>
            <DivDot color={props.widget.setting.itemColor}></DivDot>
            <a
              href={`https://www.instagram.com/${props.item?.user?.name}`}
              target="_blank"
              rel="noreferrer"
            >
              Follow
            </a>
          </DivUserName>
        </div>
        <DivContent>
          {props.item.videoUrl ? (
            <VideoPlayer
              muted
              image={props.item.imageUrl ?? ""}
              playSrc={props.item.videoUrl ?? ""}
            />
          ) : (
            <SliderImage
              desc={props.item.description}
              images={props.item?.imageUrlArr}
              thunbnail={props.item.imageUrl ?? ""}
              loading={"fillBlur"}
            />
          )}
        </DivContent>
        <DivDesc>
          <div className="orichi-instagram-item username">
            <DivUserName>
              {props.widget.setting.showNetworkIcon && <IconInstagram />}
              <h2>{props.item.user?.name}</h2>
              <DivDot color={props.widget.setting.itemColor}></DivDot>
              <a
                href={`https://www.instagram.com/${props.widget?.valueSource}`}
                target="_blank"
                rel="noreferrer"
              >
                Follow
              </a>
            </DivUserName>
            {props.item.description && (
              <p className="orichi-instagram-desc">{props.item.description}</p>
            )}
          </div>
          <div className="orichi-instagram-item">
            <ShopTagProduct product={props.widget.products[0]} />
            <DivTimezone>
              <DivTimezoneContent color={props.widget.setting.itemColor}>
                <h2>
                  {new Date(props.item.takenAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
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
