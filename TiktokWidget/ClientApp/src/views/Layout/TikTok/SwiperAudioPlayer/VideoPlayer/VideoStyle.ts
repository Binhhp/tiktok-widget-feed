import { IVideoWrapperStyle } from "./VideoType";
import { keyframes } from "styled-components";
import {
  SocialNetwork,
  TemplateLefItemContext,
  TimeZone,
  UserName,
} from "Dependencies/TikTokLayout/LayoutTemplateStype";
import { AbsoluteCenter } from "ui-components/UtilsStyle";
import breakpoints from "Dependencies/Devices/breakpoint";
import styled from "Dependencies/StyledComponents/Container";

export const DivContainer = styled(
  "div",
  "video-wrapper-div1"
)<IVideoWrapperStyle>`
  &.orichi-tiktok-video-wrapper-div1 {
    width: 100%;
    height: 100%;
    background-color: rgba(22, 24, 35, 0.06);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    video {
      object-fit: cover;
      display: block;
    }
  }
`;

export const DivContent = styled("div", "video-container")`
  &.orichi-tiktok-video-container {
    display: flex;
    flex-direction: row-reverse;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    max-height: 100%;
  }
`;

export interface IDivContentVideo {
  showProducts?: boolean;
}
export const DivContentVideo = styled("div", "video-content")<IDivContentVideo>`
  &.orichi-tiktok-video-content {
    padding: 20px 15px 15px 15px;
    background: #ffffff;
    max-width: 550px;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #000000;
    h3,
    h5 {
      font-family: "SF Pro Display";
      font-style: normal;
      color: #000000;
    }
    cursor: auto;
  }
`;

export const DivContentVideoFooter = styled("div", "video-content-footer")`
  &.video-content-footer {
    max-width: 100%;
    padding-bottom: 20px;
    position: relative;
    &:after {
      content: " ";
      background: #00000020;
      width: 80%;
      height: 0.5px;
      position: absolute;
      bottom: 0;
      left: 50%;
      right: 50%;
      transform: translate(-50%, -50%);
    }
    ${TimeZone} {
      margin-top: 30px;
    }
  }
`;

export const DivContentVideoBody = styled("div", "video-body")`
  &.orichi-tiktok-video-body {
    max-width: 100%;
    .desc {
      max-height: max-content;
      display: block;
      overflow: auto;
      line-height: normal;
    }
  }
`;

export const DivContentHeader = styled("div", "video-content-header")`
  &.orichi-tiktok-video-content-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    padding-bottom: 10px;
    ${UserName} {
      margin-right: 45px;
    }
  }
`;

export const DivVideoPlay = styled("div", "player")`
  &.orichi-tiktok-player {
    display: block;
    position: relative;
    ${AbsoluteCenter} {
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export interface IDivBasicPlayerWrapper {
  hidden?: boolean;
}
export const DivBasicPlayerWrapper = styled(
  "div",
  "video-context"
)<IDivBasicPlayerWrapper>`
  &.orichi-tiktok-video-context {
    width: ${(props) => (props.hidden ? 0 : 100)}%;
    height: 100%;
    display: block;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
`;

export const ImgPoster = styled("img", "video-poster")`
  &.orichi-tiktok-video-poster {
    object-fit: cover;
    display: block;
    max-height: 100%;
  }
`;

export const ButtonClose = styled("div", "btn__close")`
  &.orichi-tiktok-btn__close {
    cursor: pointer;
    display: none;
    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

export interface IDivPlayerIconContainer {
  hidden?: boolean;
}

export const DivPlayerIconContainer = styled(
  "div",
  "video-playbtn"
)<IDivPlayerIconContainer>`
  &.orichi-tiktok-video-playbtn {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 11;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    display: ${(props) => (props.hidden ? "none" : "auto")};
    .error-video {
      background: #000000;
      color: #ffffff;
    }
  }
`;

export const DivErrorVideo = styled(
  "div",
  "error__video"
)<IDivPlayerIconContainer>`
  &.orichi-tiktok-error__video {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 20;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    display: ${(props) => (props.hidden ? "none" : "auto")};
    background: #202020;
    color: #ffffff;
    h2 {
      text-transform: none !important;
      font-family: "SF Pro Display";
      font-style: normal;
      font-size: 16px;
      font-weight: 400;
    }
  }
`;

export const DivPlayerIcon = styled("div", "player")`
  &.orichi-tiktok-player {
    width: 62px;
    height: 62px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url("https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/webapp/main/webapp-mobile/d84eb82fb19d8c010b0b.png");
  }
`;

export const AnimationContent = keyframes`
  0% { height: 300px }
  100% { height: 120px }
`;
export const AnimationContentDiv = keyframes`
  0% { height: 300px }
  100% { height: 50px }
`;
export const AnimationContentBack = keyframes`
  0% { height: 120px }
  100% { height: 300px }
`;

export const DivVideoTitle = styled("span", "video__title")`
  &.orichi-tiktok-video__title {
    max-width: 100%;
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

export const DivVideoWrapper = styled("div", "video-wrapper")<IDivContentVideo>`
  &.orichi-tiktok-video-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
    .visible {
      ${DivContentVideo} {
        animation: ${(props) =>
          props.showProducts ? AnimationContent : AnimationContentDiv};
        animation-duration: 0.4s;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
        padding-bottom: 20px;
      }
    }
    @media only screen and (${breakpoints.device.lg}) {
      ${ImgPoster} {
        width: 100%;
        max-width: 100%;
        height: 100%;
      }
      ${ButtonClose} {
        display: block;
      }
      ${DivContainer} {
        width: 100%;
        margin: auto;
        padding: 0px;
        video {
          width: 100% !important;
        }
      }
      ${DivContent} {
        flex-direction: column;
        height: 100%;
        width: 100%;
      }
      ${TemplateLefItemContext} {
        margin: 10px;
      }
      ${DivVideoPlay} {
        max-width: 100%;
        height: auto;
        max-height: calc(
          100% - ${(props) => (props.showProducts ? 120 : 50)}px
        );
        min-height: calc(
          100% - ${(props) => (props.showProducts ? 120 : 50)}px
        );
      }
      ${DivContentVideo} {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 300px;
        max-width: 100%;
        padding: 0px 0px ${(props) => (props.showProducts ? 100 : 0)}px 0px;
        z-index: 100;
      }
      ${DivContentHeader} {
        margin: 10px;
      }
      ${DivContentVideoFooter} {
        margin: 10px;
        &:after {
          top: 0;
          bottom: auto;
        }
        ${TimeZone} {
          margin: 0px;
        }
      }
      ${ButtonClose} {
        display: block;
      }
      ${SocialNetwork} {
        display: none;
      }
    }
    @media only screen and (${breakpoints.device.sm}) {
      ${DivContainer} {
        width: 100%;
      }
    }
  }
`;
