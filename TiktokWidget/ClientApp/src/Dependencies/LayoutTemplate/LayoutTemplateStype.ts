import breakpoints from "Dependencies/Devices/breakpoint";
import styled from "Dependencies/StyledComponents/Container";
import { StyledConfig } from "./LayoutTemplateModel";
import {
  IHashtagItem,
  ITemplateImage,
  ITemplateSkeleton,
  ITemplateType,
  ITextItem,
  IUserSocialInfo,
  TemplateControlType,
  TemplateProvider,
} from "./LayoutTemplateType";

// Item Container
export const TemplateContainer = styled("div", "wrapper-item")<ITemplateType>`
  &.orichi-tiktok-wrapper-item {
    width: ${(props: ITemplateType) =>
      props.width
        ? `calc(${props.width}% - ${
            props.mr && props.ml
              ? props.mr + props.ml
              : props.pr && props.pl
              ? props.pr + props.pl
              : 0
          }px)`
        : `auto`};
    flex-direction: ${(props: ITemplateType) =>
      props.flexDirection === "row" ? "row-reverse" : "column"};
    display: flex;
    background: #ffffff;
    position: relative;
    margin: ${(props) => props.mt || 0}px ${(props) => props.mr || 0}px
      ${(props) => props.mb || 0}px ${(props) => props.ml || 0}px;
    padding: ${(props) => props.pt || 0}px ${(props) => props.pr || 0}px
      ${(props) => props.pb || 0}px ${(props) => props.pl || 0}px;
    overflow: hidden;
  }
`;

// Icon play video
export const TemplateVideoPlay = styled("div", "player")`
  &.orichi-tiktok-player {
    display: none;
    position: absolute;
    top: 10px;
    right: 5px;
    transition: display 2s;
    z-index: 5;
    svg {
      fill: #ffffff;
    }
  }
`;

// Image gif show hover
export const DynamicVideo = styled("div", "poster-dynamic")`
  &.orichi-tiktok-poster-dynamic {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: #000000;
    display: block;
    visibility: hidden;
    z-index: 3;
    img {
      object-fit: contain;
      height: 100% !important;
    }
  }
`;

// Poster Video
export const TemplateImage = styled("div", "poster")<ITemplateImage>`
  &.orichi-tiktok-poster {
    width: ${(props) => (props.flexDirection === "row" ? 50 : 100)}%;
    min-width: ${(props) => (props.flexDirection === "row" ? 50 : 100)}%;
    max-height: ${(props) =>
      props.imgHeight
        ? `${
            typeof props.imgHeight === "number"
              ? `${props.imgHeight}px`
              : `${props.imgHeight}`
          }`
        : "auto"};
    height: ${(props) => (props.height ? `${props.height}px` : "100%")};
    position: relative;
    cursor: pointer;
    background-color: #fafafa;
    img {
      object-fit: cover;
    }
    &:hover ${DynamicVideo} {
      visibility: visible;
      z-index: 3;
      background-color: #000000;
      height: 100%;
    }
    &:hover ${TemplateVideoPlay} {
      display: block;
    }
  }
`;

// Content information of video
export const TemplateContent = styled("div", "content")<ITemplateType>`
  &.orichi-tiktok-content {
    cursor: ${(props) => (props.contentOverflow ? `pointer` : `auto`)};
    &:hover ${TemplateVideoPlay} {
      display: ${(props) => (props.contentOverflow ? `block` : `none`)};
    }
    width: ${(props: ITemplateType) =>
      props.widthItem ? `${props.widthItem}` : "auto"};
    display: flex;
    z-index: ${(props) => props.zIndex ?? 10};
    flex-direction: column;
    flex: ${(props) => (!props.isHidden ? 1 : 0)};
    position: ${(props) => (!props.contentOverflow ? `relative` : `absolute`)};
    -webkit-overflow-scrolling: touch;
    height: ${(props) => (props.contentOverflow ? "100%" : "auto")};
    color: ${(props) =>
      props.color
        ? props.color
        : !props.contentOverflow
        ? `#000000`
        : `#ffffff`};
    bottom: 0;
    left: 0;
    background: ${(props) => (props.bg ? props.bg : "transparent")};
    background: ${(props) =>
      props.bg && props.contentOverflow ? `${props.bg}00` : props.bg};
  }
`;

// Item left in content components
export const TemplateLeftItem = styled("div", "video-content")<ITemplateType>`
  &.orichi-tiktok-video-content {
    border-bottom: 1px solid ${(props) => props?.color || `#000000`};
    width: calc(100% - ${StyledConfig.MARGIN_CONTENT * 2}px);
    flex: ${(props) => (!props.isHidden ? 1 : 0)};
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: ${(props) =>
      props.contentOverflow ? `flex-end` : "space-between"};
    margin: ${StyledConfig.MARGIN_CONTENT}px;
  }
`;

export const TemplateLefItemContext = styled("div", "video-info")<ITextItem>`
  &.orichi-tiktok-video-info {
    margin-top: 8px;
    h2 {
      font-family: "SF Pro Display";
      font-style: normal;
      width: 100%;
      font-size: 15px;
      margin-bottom: 3px;
      overflow: ${(props) => (props.showDesc ? `auto` : `hidden`)};
      text-overflow: ellipsis;
      white-space: ${(props) => (props.showDesc ? `normal` : "nowrap")};
    }
    .desc {
      max-height: max-content;
      display: block;
      overflow: auto;
      line-height: normal;
    }
  }
`;

// Loading template item
export const TemplateInfiniteItem = styled("div")`
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

//Hashtag components
export const Hashtag = styled("div", "hashtag")`
  &.orichi-tiktok-hashtag {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 3px;
  }
`;

export const HashtagItem = styled("div")<IHashtagItem>`
  margin-right: 4px;
  overflow: ${(props) => (props.showAll ? "auto" : "hidden")};
  text-overflow: ${(props) => (props.showAll ? "clip" : "ellipsis")};
  white-space: ${(props) => (props.showAll ? "normal" : "nowrap")};
  color: ${(props) => props.color};
  font-family: "SF Pro Display";
  font-style: normal;
`;

//Button read more
export const LinkReadMore = styled("span")`
  margin: 0px;
  font-size: 14px;
  cursor: pointer;
`;

export const ReadMoreItem = styled("div", "read-more")`
  &.orichi-tiktok-read-more {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
`;

// Show time zone
export const TimeZone = styled("span", "time-zone")`
  &.orichi-tiktok-time-zone {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-family: "SF Pro Display";
    font-style: normal;
    font-size: 12px;
  }
`;

// Show user information consists of timezone and username
export const UserInfo = styled("div", "user-info")`
  &.orichi-tiktok-user-info {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: calc(100% - ${StyledConfig.MARGIN_CONTENT * 2}px);
    margin: ${StyledConfig.MARGIN_CONTENT}px;
  }
`;
// Username of tiktok
export const UserName = styled("div", "username")`
  &.orichi-tiktok-username {
    position: relative;
    display: flex;
    align-items: center;
  }
`;

// Video title
export const ItemTitle = styled("span", "title")`
  &.orichi-tiktok-title {
    width: 100%;
    text-overflow: ellipsis;
    line-height: 18px;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-height: 54px;
    margin-bottom: 6px;
    font-size: 16px;
    font-family: "SF Pro Display";
  }
`;
//User name text link
export const UserNameTextLink = styled("a")<IHashtagItem>`
  font-family: "SF Pro Display";
  font-style: normal;
  color: ${(props) => props.color};
  margin-right: 3px;
  font-size: 14px;
  font-weight: 600;
  margin-top: 5px;
  text-decoration: none;
  cursor: pointer;
`;

// Icon logo tiktok
export const SocialNetwork = styled("div", "social-network")`
  &.orichi-tiktok-social-network {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    border-radius: 3px;
    background: #fd325a;
    padding: 1px 5px;
    margin-top: 5px;
    &:before {
      content: "";
      display: block;
      z-index: 1;
      width: 5px;
      height: 5px;
      background: #fd325a;
      position: absolute;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      bottom: -2px;
      left: 48%;
    }
  }
`;

export const CircleTick = styled("div")`
  width: 10px;
  height: 10px;
  svg {
    fill: #20d5ec;
  }
`;

export const UserSocialInfo = styled("div")<IUserSocialInfo>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: ${(props) => (props.left ? 3 : 0)}px;
  padding-left: ${(props) => (props.right ? 3 : 0)}px;
  border: 0px;
  border-top-left-radius: ${(props) => (props.left ? 5 : 0)}px;
  border-top-right-radius: ${(props) => (props.right ? 5 : 0)}px;
  border-bottom-left-radius: ${(props) => (props.left ? 5 : 0)}px;
  border-bottom-right-radius: ${(props) => (props.right ? 5 : 0)}px;
  div {
    width: ${TemplateProvider.icon}px;
  }
  svg {
    width: ${TemplateProvider.icon}px;
    height: ${TemplateProvider.icon}px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    fill: #ffffff;
  }
  span {
    font-family: "SF Pro Display";
    font-style: normal;
    font-size: 11px;
    color: #fff;
    font-weight: 500;
  }
`;

export const SocialNetworkItem = styled("div")`
  position: relative;
  margin-right: 2px;
`;

export const TemplateControl = styled("div")<TemplateControlType>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-content: center;
  margin: ${(props) => props.mt || 0}px ${(props) => props.mr || 0}px
    ${(props) => props.mb || 0}px ${(props) => props.ml || 0}px;
  padding: ${(props) => props.pt || 0}px ${(props) => props.pr || 0}px
    ${(props) => props.pb || 0}px ${(props) => props.pl || 0}px;
`;

export const TemplateControlItem = styled("div")`
  margin: auto;
`;
// Loading skeleton item

export const TemplateSkeleton = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const TemplateSkeletonItem = styled("div")<ITemplateSkeleton>`
  width: calc(${(props) => (props.row ? 100 / props.row : 100)}% - 20px);
  padding: 0 10px;
  position: relative;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    ${TemplateVideoPlay} {
      right: 20px;
      display: block;
    }
  }
  .skeleton-item {
    width: 100%;
    height: 300px;
    margin-bottom: 5px;
  }
  @media only screen and (${breakpoints.device.lg}) {
    width: ${(props) =>
      props.row ? 100 / (props.row - 2 > 0 ? props.row - 2 : 3) : 100}%;
  }
  @media only screen and (${breakpoints.device.sm}) {
    width: 33%;
  }
  @media only screen and (${breakpoints.device.sxm}) {
    width: 50%;
  }
  @media only screen and (${breakpoints.device.xm}) {
    width: 100%;
    height: 100%;
    .skeleton-item {
      height: ${window.innerHeight * 0.75}px;
    }
  }
`;

export const TemplateSkeletonItemContent = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 72px;
  overflow: hidden;
  .skeleton-desc {
    margin-bottom: 5px;
  }
`;

// Component wrapper parent
export const TemplateWrapper = styled("div", "parent")<ITemplateType>`
  &.orichi-tiktok-parent {
    width: 100%;
    min-height: 100%;
    position: relative;
    .infinite-scroll-component {
      width: 100%;
      height: 100%;
      padding-bottom: ${(props) => props.pbInfinite || 0}px;
      margin: ${(props) => props.mtInfinite || 0}px
        ${(props) => props.mrInfinite || 0}px
        ${(props) => props.mbInfinite || 0}px
        ${(props) => props.mlInfinite || 0}px;
    }
    .masonry-grid {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      width: 100%;
    }
    .masonry-grid_column {
      padding: ${(props) => props.pt || 0}px ${(props) => props.pr || 0}px
        ${(props) => props.pb || 0}px ${(props) => props.pl || 0}px;
    }
    .swiper-button-next,
    .swiper-button-prev {
      position: absolute;
      top: 50%;
      background-color: #ffffff;
      right: 10px;
      height: 32px;
      color: #000 !important;
      fill: black !important;
      stroke: black !important;
      &:after {
        font-size: 10px;
      }
    }
    .swiper-button-next {
      right: 0;
    }
    .swiper-button-prev {
      left: 0;
    }

    @media only screen and (${breakpoints.device.lg}) {
      ${TemplateContainer} {
        width: 100%;
        height: auto;
      }
      ${TemplateContent} {
        font-size: 16px;
        flex: 1;
      }
      ${TemplateImage} {
        height: ${(props) => (props.contentOverflow ? 100 : 70)}%;
      }
    }
    @media only screen and (${breakpoints.device.sm}) {
      ${TemplateContainer} {
        margin: 0px;
      }
    }
    @media only screen and (${breakpoints.device.xm}) {
      ${TemplateContainer} {
        margin: 0px;
        margin-bottom: 5px;
        padding: 0px;
      }
    }
  }
`;
