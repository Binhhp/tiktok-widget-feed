import { ContainerSection } from "common/style/UtilStyles";
import breakpoints from "Dependencies/Devices/breakpoint";
import { ProfileWrapper } from "Dependencies/Profile/ProfileStyle";
import styled from "Dependencies/StyledComponents/Container";

export const DivTiKTokenizer = styled("div", "wrapper-div1")`
  &.orichi-tiktok-wrapper-div1 {
    width: auto;
  }
`;

export const TikTokWrapper = styled("div", "wrapper-div2")`
  &.orichi-tiktok-wrapper-div2 {
    width: 100%;
    background-color: #ffffff;
    font-family: "SF Pro Display";
    font-style: normal;
  }
`;

export const TikTokHeader = styled("div", "header")`
  &.orichi-tiktok-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
  }
`;

export const TikTokTitle = styled("span", "title")`
  &.orichi-tiktok-title {
    font-weight: 700;
    font-size: 27px;
    line-height: 20px;
    margin-bottom: 17px;
  }
`;

export const TikTokCaption = styled("span", "caption")`
  &.orichi-tiktok-caption {
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
  }
`;
export interface ITikTokContent {
  hidden: boolean;
}
export const TikTokContent = styled("div")<ITikTokContent>`
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
`;

export const DivTikTok = styled("div", "content")`
  &.orichi-tiktok-content {
    padding: 50px 100px 0px 100px;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    @media only screen and (${breakpoints.device.xs}) {
      padding: 0px;
    }
    @media only screen and (${breakpoints.device.sm}) {
      padding: 0px !important;
    }
    @media only screen and (${breakpoints.device.lg}) {
      padding: 20px 5px;
      ${ContainerSection} {
        margin-bottom: 10px;
      }
      ${ProfileWrapper} {
        padding: 0px 5px;
        margin-top: 10px;
      }
    }
  }
`;
