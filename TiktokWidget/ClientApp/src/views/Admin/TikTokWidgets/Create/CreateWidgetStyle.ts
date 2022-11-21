import { ImageStorage } from "assets/images/ImageStorage";
import styled from "Dependencies/StyledComponents/Container";

export interface IMainWidgetStyle {
  animation?: boolean;
}

export const WidgetContainer = styled("div")`
  width: 100%;
  height: 100%;
`;

export const WidgetWrapper = styled("div")<IMainWidgetStyle>`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const CreateWidgetWrapper = styled("div")`
  background-image: url(${ImageStorage.Background});
  background-position: center;
  background-size: 95%;
  background-clip: unset;
  background-color: #ffffff;
  min-height: 100%;
  min-width: 100%;
`;

export const Content = styled("div")`
  transform: translate(-50%, -40%);
  position: absolute;
  top: 50%;
  left: 50%;
  color: #ffffff;
`;

export const Title = styled("h2")`
  font-weight: 600;
  font-size: 28px;
  line-height: 20px;
  display: flex;
  align-items: center;
  word-spacing: 2px;
  margin-bottom: 15px;
`;

export const Caption = styled("div")`
  font-style: oblique;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  margin-bottom: 30px;
`;

export interface ICaptionStep {
  bg?: string;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
}
export const CaptionStep = styled("div")<ICaptionStep>`
  margin: ${(props) => props.mt || 0}px ${(props) => props.mr || 0}px
    ${(props) => props.mb || 0}px ${(props) => props.ml || 0}px;
  padding: ${(props) => props.pt || 7}px ${(props) => props.pr || 30}px
    ${(props) => props.pb || 7}px ${(props) => props.pl || 30}px;
  width: max-content;
  color: #000000;
  font-size: 15px;
  font-weight: 600;
  background: linear-gradient(
    to right,
    ${(props) => props.bg || "#01f0ea"} 0,
    rgba(32, 33, 37, 0) 65%,
    rgba(32, 33, 37, 0) 100%
  );
`;

export const ColorRed = styled("span")`
  color: #ff0b53;
  text-transform: uppercase;
`;

export const ColorBlue = styled("span")`
  color: #01f0ea;
  text-transform: uppercase;
`;
