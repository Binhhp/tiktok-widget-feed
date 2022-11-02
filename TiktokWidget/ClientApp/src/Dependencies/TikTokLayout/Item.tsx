import { ITemplateItem, TemplateType } from "./LayoutTemplateType";
import React from "react";
import { Icon } from "@shopify/polaris";
import {
  CircleTickMajor,
  ConversationMinor,
  HeartMajor,
  PlayMinor,
} from "@shopify/polaris-icons";
import {
  DynamicVideo,
  CircleTick,
  Hashtag,
  HashtagItem,
  LinkReadMore,
  SocialNetwork,
  SocialNetworkItem,
  TemplateContainer,
  TemplateContent,
  TemplateImage,
  TemplateLefItemContext,
  TemplateLeftItem,
  TemplateVideoPlay,
  TimeZone,
  UserInfo,
  UserName,
  UserSocialInfo,
  UserNameTextLink,
  ItemTitle,
  ReadMoreItem,
} from "./LayoutTemplateStype";
import Image from "ui-components/Image";
import IconNetwork from "ui-components/IconNetwork";
import { DateTimeFormatter } from "common/functions/DateTimeFormat";
import { NumberFormatter } from "common/functions/NumberFormatter";
import { LogoTikTok } from "ui-components/UtilsStyle";
import IconTick from "./Icons/IconTick";
import IconComment from "./Icons/IconComment";
import IconHeart from "./Icons/IconHeart";

function Item(props: ITemplateItem) {
  const onMouseEnter =
    (id: string, leave: boolean = false) =>
    () => {
      if (props.contentOverflow) {
        const dynamic = document.getElementById(id);
        if (dynamic) {
          if (leave) {
            dynamic.style.visibility = "hidden";
          } else {
            dynamic.style.visibility = "visible";
          }
        }
      }
    };

  const onClickRender = () => {
    if (props.contentOverflow) {
      props.clickRender(props.index)();
    }
    return;
  };

  const handleClickShowVideos = () => props.clickRender(props.index)();
  return (
    <TemplateContainer {...props}>
      <TemplateImage onClick={handleClickShowVideos} {...props}>
        <Image
          src={props.item.video?.originCover}
          alt={props.item?.desc}
        ></Image>
        <TemplateVideoPlay>
          <Icon source={PlayMinor}></Icon>
        </TemplateVideoPlay>
        {props.enableHover && (
          <DynamicVideo id={`${props.item.id}-dynamic`}>
            <Image
              src={props.item.video?.dynamicCover}
              alt={props.item?.desc}
            ></Image>
          </DynamicVideo>
        )}
      </TemplateImage>
      <TemplateContent
        onMouseEnter={onMouseEnter(`${props.item?.id}-dynamic`)}
        onMouseLeave={onMouseEnter(`${props.item?.id}-dynamic`, true)}
        color={props.options?.color}
        onClick={onClickRender}
        {...props}
      >
        <TemplateLeftItem color={props.options?.color} {...props}>
          <TemplateLefItemContext {...props}>
            {props.item?.desc && <ItemTitle>{props.item?.desc}</ItemTitle>}
            {props.item?.textExtra && props.item?.textExtra?.length > 0 && (
              <Hashtag>
                <HashtagItem
                  showAll={props.showAllHashTag}
                  color={
                    props.options?.accentColor ||
                    props.options?.color ||
                    "#000000"
                  }
                >
                  {props.item?.textExtra?.map((item) =>
                    item.hashtagName ? `#${item.hashtagName} ` : ""
                  )}
                </HashtagItem>
              </Hashtag>
            )}
            <ReadMoreItem>
              <LinkReadMore onClick={handleClickShowVideos}>
                {props.options?.readMore}
              </LinkReadMore>
              <IconNetwork
                padding={1}
                topPosition={props.type === TemplateType.List}
                status={props.options?.showNetworkIcon}
              >
                <LogoTikTok
                  src="https://i.imgur.com/I6rfRMu.png"
                  alt="Logo TikTok Widget Feed"
                />
              </IconNetwork>
            </ReadMoreItem>
          </TemplateLefItemContext>
          <TimeZone>
            {DateTimeFormatter.ConvertTimeStamp(props.item?.createTime)}
          </TimeZone>
        </TemplateLeftItem>
        <UserInfo>
          <UserName>
            <UserNameTextLink
              color={
                props.options?.accentColor || props.options?.color || "#000000"
              }
              href="#"
            >
              @{props.item?.author}
            </UserNameTextLink>
            <CircleTick>
              <IconTick />
            </CircleTick>
          </UserName>
          <SocialNetwork>
            <UserSocialInfo left={true}>
              <SocialNetworkItem>
                <IconHeart />
              </SocialNetworkItem>
              <span>{NumberFormatter.Format(props.item.stats?.diggCount)}</span>
            </UserSocialInfo>
            <UserSocialInfo right={true}>
              <SocialNetworkItem>
                <IconComment />
              </SocialNetworkItem>
              <span>
                {NumberFormatter.Format(props.item.stats?.commentCount)}
              </span>
            </UserSocialInfo>
          </SocialNetwork>
        </UserInfo>
        {props.contentOverflow && (
          <TemplateVideoPlay>
            <Icon source={PlayMinor}></Icon>
          </TemplateVideoPlay>
        )}
      </TemplateContent>
    </TemplateContainer>
  );
}

export default React.memo(Item);
