import { Icon, Spinner } from "@shopify/polaris";
import {
  CircleTickMajor,
  ConversationMinor,
  HeartMajor,
  MinusMinor,
  MobileCancelMajor,
} from "@shopify/polaris-icons";
import { DateTimeFormatter } from "common/functions/DateTimeFormat";
import { NumberFormatter } from "common/functions/NumberFormatter";
import React from "react";
import ReactPlayer from "react-player";
import {
  CircleTick,
  Hashtag,
  HashtagItem,
  LinkReadMore,
  SocialNetwork,
  SocialNetworkItem,
  TemplateLefItemContext,
  TimeZone,
  UserName,
  UserNameTextLink,
  UserSocialInfo,
} from "Dependencies/LayoutTemplate/LayoutTemplateStype";
import ShopTagProduct from "views/Layout/ShopTagProduct";
import IconNetwork from "ui-components/IconNetwork";
import { AbsoluteCenter } from "ui-components/UtilsStyle";
import {
  ButtonClose,
  DivBasicPlayerWrapper,
  DivContainer,
  DivContent,
  DivContentHeader,
  DivContentVideo,
  DivContentVideoBody,
  DivContentVideoFooter,
  DivErrorVideo,
  DivPlayerIcon,
  DivPlayerIconContainer,
  DivVideoPlay,
  DivVideoTitle,
  DivVideoWrapper,
  ImgPoster,
} from "./VideoStyle";
import { IVideoProps } from "./VideoType";
import Loader from "ui-components/Loader";

function VideoPlayer(props: IVideoProps) {
  const video = props.item.video?.playAddr;

  const onReadMore = () => {
    const desc = document.getElementById(
      `${window.btoa(`desc-${props.item.id}`)}`
    );
    if (desc) desc.classList.add("desc");
    const more = document.getElementById(
      `${window.btoa(`more-${props.item.id}`)}`
    );
    if (more) more.style.display = "none";
  };
  return (
    <DivVideoWrapper
      showProducts={
        props.options.products && props.options.products?.length > 0
      }
    >
      <DivContainer className={`${props.hidden ? "visible" : "show"}`}>
        <DivContent>
          <DivVideoPlay>
            <ImgPoster
              src={props.item.video.originCover}
              alt={props.item.desc}
            ></ImgPoster>
            <AbsoluteCenter width={40}>
              <Spinner size="large" />
            </AbsoluteCenter>
            <DivErrorVideo
              hidden={!props.error?.active}
              className="error-video"
            >
              <h2>{props.error?.message}</h2>
            </DivErrorVideo>
            <DivBasicPlayerWrapper hidden={props.loading}>
              <ReactPlayer
                playIcon={
                  <DivPlayerIconContainer>
                    <DivPlayerIcon></DivPlayerIcon>
                  </DivPlayerIconContainer>
                }
                fallback={<Loader></Loader>}
                onPause={props.onPause}
                onPlay={props.onPlaying(props.item.id)}
                url={video}
                playing={props.playing ?? false}
                stopOnUnmount={true}
                loop={true}
                width={props.loading ? 0 : `auto`}
                height="100%"
                controls
                onError={(error) => {
                  if (props.onError) props.onError(error);
                }}
              />
              <DivPlayerIconContainer
                onClick={props.onPlaying(props.item.id)}
                hidden={props.playing}
              >
                <DivPlayerIcon></DivPlayerIcon>
              </DivPlayerIconContainer>
            </DivBasicPlayerWrapper>
          </DivVideoPlay>
          <DivContentVideo>
            <DivContentVideoBody>
              <DivContentHeader>
                <UserName color="#000000">
                  <UserNameTextLink color="#000000">
                    @{props.item?.author}
                  </UserNameTextLink>
                  {props.item?.officalItem && (
                    <CircleTick>
                      <Icon source={CircleTickMajor} />
                    </CircleTick>
                  )}
                </UserName>
                <SocialNetwork>
                  <UserSocialInfo left={true}>
                    <SocialNetworkItem>
                      <Icon source={HeartMajor}></Icon>
                    </SocialNetworkItem>
                    <span>
                      {NumberFormatter.Format(props.item.stats?.diggCount)}
                    </span>
                  </UserSocialInfo>
                  <UserSocialInfo right={true}>
                    <SocialNetworkItem style={{ marginRight: `6px` }}>
                      <Icon source={ConversationMinor}></Icon>
                    </SocialNetworkItem>
                    <span>
                      {NumberFormatter.Format(props.item.stats?.commentCount)}
                    </span>
                  </UserSocialInfo>
                </SocialNetwork>
                <ButtonClose onClick={props.onSetHidden}>
                  <Icon
                    source={props.hidden ? MinusMinor : MobileCancelMajor}
                  />
                </ButtonClose>
              </DivContentHeader>
              <TemplateLefItemContext showDesc>
                <DivVideoTitle id={`${window.btoa(`desc-${props.item.id}`)}`}>
                  {props.item?.desc}
                </DivVideoTitle>
                <Hashtag>
                  <HashtagItem showAll color="#000000">
                    {props.item?.textExtra?.map((item) =>
                      item.hashtagName ? `#${item.hashtagName} ` : ""
                    )}
                  </HashtagItem>
                </Hashtag>
                {props.item?.desc && props.item?.desc.length > 230 && (
                  <LinkReadMore
                    id={`${window.btoa(`more-${props.item.id}`)}`}
                    onClick={onReadMore}
                  >
                    {props.options?.labelReadMore}
                  </LinkReadMore>
                )}
              </TemplateLefItemContext>
            </DivContentVideoBody>
            <ShopTagProduct
              product={
                props.options.products &&
                props.options.products?.length > 0 &&
                props.options.products[0]
              }
            ></ShopTagProduct>
            <DivContentVideoFooter>
              <TimeZone>
                <span>
                  {DateTimeFormatter.ConvertTimeStamp(
                    props.item?.createTime,
                    true
                  )}
                </span>
                <IconNetwork status="enable">
                  <img
                    src="https://i.imgur.com/I6rfRMu.png"
                    alt="Logo TikTok Widget Feed"
                  />
                </IconNetwork>
              </TimeZone>
            </DivContentVideoFooter>
          </DivContentVideo>
        </DivContent>
      </DivContainer>
    </DivVideoWrapper>
  );
}

export default VideoPlayer;
