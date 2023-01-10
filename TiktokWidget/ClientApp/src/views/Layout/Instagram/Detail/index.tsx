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
import config from "config";
import { UriProvider } from "common/functions/FuncUtils";

interface IDetailProps {
  item: IInstagramDto;
  widget: BaseInstagramWidget;
  onExit: () => void;
}

function Detail(props: IDetailProps) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.onExit);

  const followLink =
    props.widget.sourceType === "UserName"
      ? props.item?.user?.name
        ? `https://www.instagram.com/${props.item?.user?.name?.toLowerCase()}`
        : `https://www.instagram.com/${props.widget?.valueSource?.toLowerCase()}`
      : `https://www.instagram.com/explore/tags/${props.widget?.valueSource?.toLowerCase()}`;

  return (
    <DivDetailWrapper>
      <DivContainer ref={wrapperRef}>
        <div className="orichi-instagram-user">
          <DivUserName>
            {props.widget.setting.showNetworkIcon && <IconInstagram />}
            <span className="div__username">
              {props.item?.user?.name
                ? props.item?.user?.name
                : props.widget.valueSource}
            </span>
            <DivDot color={props.widget.setting.itemColor}></DivDot>
            <a href={followLink} target="_blank" rel="noreferrer">
              Follow
            </a>
          </DivUserName>
        </div>
        <DivContent>
          {props.item.videoUrl ? (
            <VideoPlayer
              muted
              image={UriProvider.FormatURLImage(
                props.item.imageUrl,
                config.CORS_PROXY,
                true
              )}
              playSrc={UriProvider.FormatURLImage(
                props.item.videoUrl,
                config.CORS_PROXY,
                true
              )}
            />
          ) : (
            <SliderImage
              desc={props.item.description}
              images={props.item?.imageUrlArr}
              thunbnail={props.item.imageUrl ?? ""}
              loading={"fillBlur"}
              corsProxy={config.CORS_PROXY}
              isEncodeURI
            />
          )}
        </DivContent>
        <DivDesc>
          <div className="orichi-instagram-item username">
            <DivUserName>
              {props.widget.setting.showNetworkIcon && <IconInstagram />}
              <span className="div__username">
                {props.item?.user?.name
                  ? props.item?.user?.name
                  : props.widget.valueSource}
              </span>
              <DivDot color={props.widget.setting.itemColor}></DivDot>
              <a href={followLink} target="_blank" rel="noreferrer">
                Follow
              </a>
            </DivUserName>
            <div className="orichi-instagram-desc">
              {props.item.description && (
                <p
                  className="div__desc"
                  id={`${window.btoa(`desc-${props.item.id}`)}`}
                >
                  {props.item.description}
                </p>
              )}
            </div>
          </div>
          <div className="orichi-instagram-item">
            <ShopTagProduct
              format={props.widget.shops?.currency}
              product={props.widget.products[0]}
            />
            <DivTimezone>
              <DivTimezoneContent>
                <span className="datepicker">
                  {new Date(props.item.takenAt * 1000).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
                <DivDot bg="#888888"></DivDot>
                <span className="view-on">View on Instagram</span>
              </DivTimezoneContent>
            </DivTimezone>
          </div>
        </DivDesc>
      </DivContainer>
    </DivDetailWrapper>
  );
}

export default Detail;
