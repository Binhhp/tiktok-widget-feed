import breakpoints from "Dependencies/Devices/breakpoint";
import styled from "styled-components";

export const MainContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 60px;
  align-items: stretch;
  position: relative;
`;

export const ChildrenContent = styled.div`
  width: 100%;
  padding-left: 239px;
`;

export const MainLayoutWrapper = styled.div`
  width: 100%;
  height: 100%;
  @media only screen and (${breakpoints.device.lg}) {
    ${ChildrenContent} {
      width: 100%;
      height: 100%;
      padding: 0px;
    }
  }
`;
