import breakpoints from "Dependencies/Devices/breakpoint";
import styled from "Dependencies/StyledComponents/Container";

export const InstagramLayoutWrappepr = styled(
  "div",
  "wrapper2e",
  "orichi-instagram"
)`
  &.orichi-instagram-wrapper2e {
    width: 100%;
  }
`;

export const DivTitle = styled("div", "divtitle", "orichi-instagram")`
  &.orichi-instagram-divtitle {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-left: 20px;
  }
`;

export const DivTitleContent = styled(
  "h2",
  "divtitle__content",
  "orichi-instagram"
)`
  &.orichi-instagram-divtitle__content {
    font-family: "SF Pro Text";
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 20px;
    color: #000000;
    margin: 0;
  }
`;

export const DivIcon = styled("div", "icon", "orichi-instagram")`
  &.orichi-instagram-icon {
    margin: 0px 10px 0px 0px;
    height: 24px;
    width: 24px;
    display: block;
  }
`;

export const DivLayoutFlexbox = styled("div", "divbox", "orichi-instagram")`
  &.orichi-instagram-divbox {
    align-items: stretch;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
  }
`;

export const InstagramLayoutContainer = styled(
  "div",
  "container",
  "orichi-instagram"
)`
  &.orichi-instagram-container {
    width: 100%;
    height: 100%;
    @media only screen and (${breakpoints.device.lg}) {
      .orichi-instagram-divtitle {
        margin-left: 0px;
        width: 100%;
        justify-content: center;
      }
    }
    @media only screen and (${breakpoints.device.sm}) {
    }
    @media only screen and (${breakpoints.device.xm}) {
    }
  }
`;
