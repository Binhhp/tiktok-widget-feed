import styled from "Dependencies/StyledComponents/Container";

export const FormConfiguration = styled("div")`
  width: 100%;
  height: 100%;
`;

export const FormConfigurationWrapper = styled("div")`
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #202223;
  padding-bottom: 40px;
  position: relative;
`;

export const TikTokHeaderLive = styled("div", "header")`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;
  align-items: center;
`;

export const TikTokTitleLive = styled("span", "title")`
  font-weight: 700;
  font-size: 27px;
  line-height: 20px;
  margin-bottom: 17px;
`;

export const TikTokCaptionLive = styled("span", "caption")`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
`;

//Mobile device support live
export interface IMobileDeviceView {
  width?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  boxShadow?: string;
}

export const MobileDeviceView = styled("div")<IMobileDeviceView>`
  padding: ${(props) => props.pt || 0}px ${(props) => props.pr || 0}px
    ${(props) => props.pb || 0}px ${(props) => props.pl || 0}px;
  max-width: ${(props) => props.width || 100}%;
  box-shadow: ${(props) => (props.boxShadow ? props.boxShadow : "none")};
`;

export const DeviceManagement = styled("div")`
  position: absolute;
  top: 25px;
  right: 10px;
  cursor: pointer;
`;

export const MobileHeader = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const IconMobile = styled("span")`
  display: flex;
  justify-content: center;
  margin-left: 5px;
  img {
    width: 12px;
    height: 12px;
  }
`;
export const MobileInformation = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .Polaris-Icon {
    width: 11px;
    height: 11px;
    margin-left: 5px;
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;
