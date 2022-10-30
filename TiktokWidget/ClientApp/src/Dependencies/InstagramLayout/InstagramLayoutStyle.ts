import breakpoints from "Dependencies/Devices/breakpoint";
import styled from "Dependencies/StyledComponents/Container";

export const InstagramLayoutWrappepr = styled("div", "", "orichi-instagram")`
  width: 100%;
`;

export const DivTitle = styled("div", "", "orichi-instagram")`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const DivTitleContent = styled("h2", "", "orichi-instagram")`
  font-family: "SF Pro Display";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #000000;
  margin: 0;
`;

export const DivIcon = styled("div", "", "orichi-instagram")`
  margin: 0px 10px 0px 0px;
  height: 24px;
  width: 24px;
  display: block;
`;

export const DivLayoutFlexbox = styled("div", "", "orichi-instagram")`
  align-items: stretch;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
`;

export const InstagramLayoutContainer = styled("div", "", "orichi-instagram")`
  width: 100%;
  height: 100%;
  @media only screen and (${breakpoints.device.lg}) {
  }
  @media only screen and (${breakpoints.device.sm}) {
  }
  @media only screen and (${breakpoints.device.xm}) {
  }
`;
