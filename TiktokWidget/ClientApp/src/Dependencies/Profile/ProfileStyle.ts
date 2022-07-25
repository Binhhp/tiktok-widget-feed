import breakpoints from "Dependencies/Devices/breakpoint";
import styled from "styled-components";
import { IAvatar, IProfileInfo, IProfileWrapper } from "./ProfileType";

export const ProfilePlus = styled.div<IAvatar>`
  cursor: pointer;
  position: absolute;
  bottom: 0px;
  right: 0px;
  background: linear-gradient(153.43deg, #59bdf3 8.89%, #6adfc8 75.56%);
  border: 3px solid #ffffff;
  border-radius: 50%;
  z-index: 1;
  width: ${(props) => (props.imgWidth ? `${props.imgWidth * 0.3}px` : "auto")};
  height: ${(props) => (props.imgWidth ? `${props.imgWidth * 0.3}px` : "auto")};
  .Polaris-Icon--colorHighlight svg {
    fill: #ffffff;
  }
  svg {
    fill: #ffffff;
    width: 15px;
    height: 15px;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
  }
`;

export const ProfileInfo = styled.div<IProfileInfo>`
  width: calc(100% - ${(props) => props.imgWidth || 100}px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 10px;
  position: relative;
  h2 {
    width: 100%;
    font-weight: 600;
    font-size: ${(props) => props.fontSize || 16}px !important;
    font-family: "SF Pro Display";
    font-style: normal;
    text-transform: none !important;
  }
  span {
    font-size: ${(props) => props.fontSize || 16}px !important;
    font-family: "SF Pro Display";
    font-style: normal;
    text-transform: none !important;
  }
`;

export const Contact = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: row;
  margin-bottom: 7px;
  justify-content: space-between;
`;

export const ContactItem = styled.div<IProfileInfo>`
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    text-align: center;
    font-weight: 600;
    font-size: ${(props) => props.fontSize || 16}px !important;
    font-family: "SF Pro Display";
    font-style: normal;
    text-transform: none !important;
  }
  span {
    color: #8a8b8f;
    font-size: ${(props) =>
      props.fontSize ? props.fontSize - 3 : 13}px !important;
    font-family: "SF Pro Display";
    font-style: normal;
    text-transform: none !important;
  }
`;

export const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  h2 {
    font-family: "SF Pro Display";
    font-style: normal;
    text-transform: none !important;
  }
  margin-top: 10px;
  .following {
    border-width: 1px;
    border-style: solid;
    border-radius: 2px;
    color: rgb(254, 44, 85);
    border-color: rgb(254, 44, 85);
    background-color: rgb(255, 255, 255);
    &:hover {
      background-color: rgba(254, 44, 85, 0.06);
    }
  }
  .follow {
    border-width: 1px;
    border-style: solid;
    border-radius: 2px;
    background: #fe2c55;
    border: none;
    color: #fff;
    &:hover {
      background-color: #eb3054;
    }
  }
`;

export const FollowerButton = styled.button`
  padding: 6px 40px;
  cursor: pointer;
  font-weight: 600 !important;
  margin-bottom: 5px;
  margin-left: 10px;
  font-size: 14px !important;
  line-height: normal !important;
`;

export const AvatarProfile = styled.div<IAvatar>`
  width: ${(props) => props.imgWidth || 100}px;
  height: ${(props) => props.imgWidth || 100}px;
  border: 3px solid #e4e4e5;
  border-radius: 50%;
  position: relative;
  .profile-skeleton {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    line-height: normal;
  }
  .sb-avatar,
  .sb-avatar__text {
    width: 100% !important;
    height: 100% !important;
  }
  img {
    width: 100%;
    object-fit: cover;
    filter: blur(0px);
    border-radius: 50%;
  }
`;

export const ProfileWrapper = styled.div<IProfileWrapper>`
  display: ${(props) => props.display ?? "flex"};
  flex-direction: row;
  flex-wrap: wrap;
  margin: ${(props) => props.mt || 0}px ${(props) => props.mr || 0}px
    ${(props) => props.mb || 0}px ${(props) => props.ml || 0}px;
  padding: ${(props) => props.pt || 0}px ${(props) => props.pr || 0}px
    ${(props) => props.pb || 0}px ${(props) => props.pl || 0}px;
  background: ${(props) => props.bg || "transparent"};
  max-width: ${(props) =>
    props.maxWidth
      ? `${
          typeof props.maxWidth === "number"
            ? `${props.maxWidth}px`
            : `${props.maxWidth}`
        }`
      : `380px`};
  @media only screen and (${breakpoints.device.lg}) {
    width: 100%;
    margin: 0;
    padding: 0;
    ${ProfileInfo} {
      width: calc(100% - 70px);
    }
    ${AvatarProfile} {
      width: 70px;
      height: 70px;
      ${ProfilePlus} {
        width: 23px;
        height: 23px;
        bottom: -4px;
        right: -4px;
      }
    }
    ${FollowerButton} {
      padding: 3px 20px;
    }
  }
  @media only screen and (${breakpoints.device.sm}) {
    ${ProfileHeader} {
      margin-top: 5px;
    }
    ${AvatarProfile} {
      ${ProfilePlus} {
        width: 20px;
        height: 20px;
        bottom: -4px;
        right: -4px;
      }
    }
    ${FollowerButton} {
      padding: 3px 18px;
    }
  }
  @media only screen and (${breakpoints.device.xm}) {
    max-width: 100%;
  }
`;
