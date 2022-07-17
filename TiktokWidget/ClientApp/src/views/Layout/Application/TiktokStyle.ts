import { ContainerSection } from "common/style/Utils.style";
import breakpoints from "Dependencies/Devices/breakpoint";
import { ProfileWrapper } from "Dependencies/Profile/ProfileStyle";
import styled from "styled-components";

export const DivTiKTokenizer = styled.div`
  width: auto;
`;

export const TikTokWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  font-family: "SF Pro Display";
  font-style: normal;
`;

export interface ITikTokContent {
  hidden: boolean;
}
export const TikTokContent = styled.div<ITikTokContent>`
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
`;

export const DivTikTok = styled.div`
  width: 100%;
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
`;
