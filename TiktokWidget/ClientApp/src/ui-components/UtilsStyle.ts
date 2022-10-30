import styled from "Dependencies/StyledComponents/Container";
import { keyframes } from "styled-components";

export const LoaderBackground = styled("div")`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999999;
`;

export const LoaderWrapper = styled("div")`
  display: flex;
  background: #fafafa;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  svg {
    width: 40px;
    height: 40px;
  }
`;

export const ImageStyle = styled("img")`
  width: 100%;
  max-width: 100%;
  height: 100%;
  display: block;
`;

export const ButtonViewMore = styled("button", "btn-viewmore")`
  &.orichi-tiktok-btn-viewmore {
    background: #01f0ea;
    outline: none;
    border: none;
    span svg {
      width: 23px;
      height: 23px;
      margin: 1px 20px;
    }
    h2.viewmore {
      font-family: "SF Pro Display";
      font-style: normal;
      font-size: 14px;
      margin: 5px 7px;
      color: #fff;
      font-weight: 400;
    }
  }
`;

export const LoadingInfiniteWrapper = styled("div")`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  padding: 20px 0px 10px 0px;
  ${ButtonViewMore} {
    border: none;
    padding: 0px 20px;
    color: #fafafa !important;
    cursor: pointer;
    h2 {
      letter-spacing: 0px !important;
      text-transform: none !important;
      margin: 5px 0px !important;
      font-size: 1em !important;
      font-weight: 400 !important;
    }
    &:hover {
      background: #03e5df;
      color: #ffffff;
    }
  }
`;

// IconNetwork class

export interface IIconNetworkWrapper {
  status?: "enable" | "disable";
  width?: number;
  topPosition?: boolean;
  children: any;
  padding?: number;
}

export const IconNetworkWrapper = styled("div", "icon")<IIconNetworkWrapper>`
  &.orichi-tiktok-icon {
    display: ${(props) =>
      props.status && props.status === "disable" ? "none" : "flex"};
    align-items: center;
    width: ${(props) => props.width || 15}px;
    height: ${(props) => props.width || 15}px;
    justify-content: center;
    border-radius: 5px;
    position: ${(props) => (props.topPosition ? "absolute" : "relative")};
    top: ${(props) => (props.topPosition ? "10px" : "none")};
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    padding: ${(props) => props.padding ?? 3}px;
    background: #000000;
  }
`;

export const LogoTikTok = styled("img", "logo")`
  &.orichi-tiktok-logo {
    width: 10px !important;
    height: 10px !important;
    display: block;
    object-fit: contain;
  }
`;

interface IAbsoluteCenter {
  width?: number | string;
  zIndex?: number;
}
export const AbsoluteCenter = styled("div", "video-loader")<IAbsoluteCenter>`
  &.orichi-tiktok-video-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: ${(props) => props.zIndex ?? 1};
    width: ${(props) =>
      props.width
        ? `${
            typeof props.width === "number"
              ? `${props.width}px`
              : `${props.width}`
          }`
        : "auto"};
  }
`;

//TikTok Loading

const AnimationLoaderLeftToRight = keyframes`
0% {
    left: 0;
  }
  25% {
    transform: scale(1.2);
  }
  50% {
    left: 22px;
  }
  75% {
    transform: scale(0.8);
  }
  100% {
    left: 0;
  }
`;

const AnimationLoaderRightToLeft = keyframes`
0% {
    right: 0;
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    right: 22px;
  }
  75% {
    transform: scale(1.2);
  }
  100% {
    right: 0;
  }
`;

export const DivTikTokLoaderContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivTikTokLoader1 = styled("div")`
  position: relative;
  width: 20px;
  height: 20px;
  background: rgb(77, 232, 244);
  border-radius: 50%;
  animation: ${AnimationLoaderLeftToRight} 0.8s ease-in-out infinite;
  mix-blend-mode: darken;
  transform: scale(1);
`;

export const DivTikTokLoader2 = styled("div")`
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  mix-blend-mode: darken;
  transform: scale(1);
  background: rgb(253, 62, 62);
  animation: ${AnimationLoaderRightToLeft} 0.8s ease-in-out infinite;
`;
