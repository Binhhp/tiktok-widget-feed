import { IVideoWrapperStyle } from "./VideoType";
import { keyframes } from "styled-components";
import {
  SocialNetwork,
  TimeZone,
  UserName,
} from "Dependencies/TikTokLayout/LayoutTemplateStype";
import { AbsoluteCenter } from "ui-components/UtilsStyle";
import breakpoints from "Dependencies/Devices/breakpoint";
import styled from "Dependencies/StyledComponents/Container";

const DisplayNameStyled = "orichi-video";
export const DivContainer = styled(
  "div",
  "wrapper-div1",
  DisplayNameStyled
)<IVideoWrapperStyle>`
  &.orichi-video-wrapper-div1 {
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

export const DivContent = styled("div", "container", DisplayNameStyled)`
  &.orichi-video-container {
    overflow: hidden;
    max-height: 100%;
  }
`;

export interface IDivContentVideo {
  showProducts?: boolean;
}
export const DivContentVideo = styled(
  "div",
  "content",
  DisplayNameStyled
)<IDivContentVideo>`
  &.orichi-video-content {
    padding: 20px 15px 15px 15px;
    background: #ffffff;
    max-width: 550px;
    min-width: 350px;
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

export const DivContentVideoFooter = styled(
  "div",
  "content-footer",
  DisplayNameStyled
)`
  &.orichi-video-content-footer {
    width: 100%;
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

export const DivContentVideoBody = styled("div", "body", DisplayNameStyled)`
  &.orichi-video-body {
    width: 100%;
    .desc {
      max-height: max-content;
      display: block;
      overflow: auto;
      line-height: normal;
    }
  }
`;

export const DivContentHeader = styled(
  "div",
  "content-header",
  DisplayNameStyled
)`
  &.orichi-video-content-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 11px;
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    ${UserName} {
      margin-right: 45px;
    }
  }
`;

export const DivVideoPlay = styled("div", "player", DisplayNameStyled)`
  &.orichi-video-player {
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
  "context",
  DisplayNameStyled
)<IDivBasicPlayerWrapper>`
  &.orichi-video-context {
    width: 100%;
    height: 100%;
    display: block;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
`;

export const ImgPoster = styled("img", "poster", DisplayNameStyled)`
  &.orichi-video-poster {
    object-fit: cover;
    display: block;
    max-height: 100%;
    max-width: 100%;
  }
`;

export const ButtonClose = styled("div")`
  cursor: pointer;
  display: none;
`;

export interface IDivPlayerIconContainer {
  hidden?: boolean;
}

export const DivPlayerIconContainer = styled(
  "div",
  "playbtn",
  DisplayNameStyled
)<IDivPlayerIconContainer>`
  &.orichi-video-playbtn {
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
  "error",
  DisplayNameStyled
)<IDivPlayerIconContainer>`
  &.orichi-video-error {
    position: absolute;
    width: calc(100% - 20px);
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
    padding: 0 10px;
    h2 {
      text-transform: none !important;
      font-family: "SF Pro Display";
      font-style: normal;
      font-size: 16px;
      font-weight: 400;
    }
  }
`;

export const DivPlayerIcon = styled("div", "play", DisplayNameStyled)`
  &.orichi-video-play {
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

export const DivVideoTitle = styled("span", "title", DisplayNameStyled)`
  &.orichi-video-title {
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

export const DivLoader = styled("div", "loader", DisplayNameStyled)`
  &.orichi-video-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    width: 40px;
  }
`;

export const DivVideoWrapper = styled(
  "div",
  "wrapper",
  DisplayNameStyled
)<IDivContentVideo>`
  &.orichi-video-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
    @media only screen and (${breakpoints.device.lg}) {
      ${ImgPoster} {
        width: 100%;
        height: 100%;
      }
      ${DivContainer} {
        width: 70%;
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
      ${DivVideoPlay} {
        min-width: 100%;
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
        min-width: 100%;
        padding: 7px 10px ${(props) => (props.showProducts ? 80 : 0)}px 10px;
        z-index: 100;
      }
      ${DivContentHeader} {
        margin-bottom: 7px;
        padding-bottom: 8px;
      }
      ${DivContentVideoFooter} {
        padding: 10px 0px;
        margin: 0px;
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
