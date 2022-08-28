import breakpoints from "Dependencies/Devices/breakpoint";
import styled from "Dependencies/StyledComponents/Container";
import { IImageCoverStyle, IAudioPlayerWrapper } from "./AudioPlayerType";

export const DivVideoContainer = styled("div", "video-container")`
  &.orichi-tiktok-video-container {
    background: rgb(0, 0, 0);
    position: relative;
    overflow: hidden;
    flex: 1;
    height: 100%;
  }
`;

export const DivBlurBackground = styled(
  "div",
  "video-background"
)<IImageCoverStyle>`
  &.orichi-tiktok-video-background {
    position: absolute;
    width: 100%;
    max-height: 100%;
    filter: blur(20px);
    opacity: 0.35;
    background: center center / cover no-repeat;
    background-image: url("${(props) => props.url}");
    overflow: hidden;
  }
`;

export const ButtonBasicClose = styled("button", "btn-close")`
  &.orichi-tiktok-btn-close {
    position: absolute;
    z-index: 1;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 50%;
    cursor: pointer;
    border: none;
    outline: none;
    top: 20px;
    transition: opacity 0.3s ease 0s;
    left: 20px;
    .Polaris-Icon {
      height: auto;
    }
    &:hover {
      opacity: 0.7;
    }
    svg {
      fill: #ffffff;
    }
  }
`;

export const VideoScrollWrapper = styled(
  "div",
  "video-player"
)<IAudioPlayerWrapper>`
  &.orichi-tiktok-video-player {
    display: ${(props) => (props.active ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgb(255, 255, 255);
    z-index: 10000000000;
    overflow-x: hidden;
    overflow-y: auto;
    .orichi-tiktok-slider {
      width: 100%;
      height: 100%;
    }
    .swiper-button-next {
      position: absolute;
      z-index: 1000;
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      border: none;
      top: calc(50% + 8px);
      outline: none;
      transform: rotate(90deg);
      margin-top: -24px;
      background: rgba(255, 255, 255, 0.12);
      right: 20px;
      &:hover {
        opacity: 0.7;
      }
      &:after {
        font-size: 17px;
        color: #ffffff;
        font-weight: bold;
      }
    }
    .swiper-button-disabled {
      display: none !important;
    }
    .swiper-button-prev {
      position: absolute;
      z-index: 1000;
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      border: none;
      outline: none;
      top: calc(50% - 48px);
      transform: rotate(90deg);
      margin-top: -24px;
      background: rgba(255, 255, 255, 0.12);
      right: 20px;
      left: auto !important;
      svg {
        fill: #ffffff;
        width: 26px;
        height: 26px;
      }
      &:hover {
        opacity: 0.7;
      }
      &:after {
        font-size: 17px;
        color: #ffffff;
        font-weight: bold;
      }
    }
    @media only screen and (${breakpoints.device.xs}) {
    }
    @media only screen and (${breakpoints.device.sm}) {
      .swiper-button-next,
      .swiper-button-prev {
        width: 35px;
        height: 35px;
        &:after {
          font-size: 13px;
          line-height: 35px;
        }
      }
      .swiper-button-next {
        margin-top: -34px;
      }
      ${ButtonBasicClose} {
        width: 35px;
        height: 35px;
        right: 15px;
        top: 10px;
        left: auto;
        svg {
          width: 100% !important;
          height: 100% !important;
        }
      }
    }
  }
`;
