import breakpoints from "Dependencies/Devices/breakpoint";
import styled from "Dependencies/StyledComponents/Container";

export interface ITemplateItemImage {
  width?: number;
}

export interface ITemplateTem {
  isActive?: boolean;
  margin?: number;
  height?: number;
}

interface ITemplateSettingWrapper {
  marginTop?: number;
}
export const TemplateSettingWrapper = styled("div")<ITemplateSettingWrapper>`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${(props) => props.marginTop ?? 30}px;
  align-content: stretch;
  justify-content: space-between;
`;

export const TemplateItem = styled("div")<ITemplateTem>`
  width: calc(50% - 10px);
  height: ${(props) => props.height ?? 150}px;
  margin: ${(props) => props.margin ?? 10}px 0px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  border: 1px solid ${(props) => (props.isActive ? "black" : "#ffffff")};
  @media only screen and (${breakpoints.device.bigLg}) {
    height: ${(props) => (props.height ? props.height + 100 : 250)}px;
  }
`;

export const TemplateItemImage = styled("div")<ITemplateItemImage>`
  height: calc(100% - 50px);
  position: relative;
  margin: 10px 0px;
  @media only screen and (${breakpoints.device.bigLg}) {
    height: calc(100% - 100px);
    margin: 50px 0px;
  }
  img {
    padding: 0 1px;
    width: ${(props) => props.width || 100}%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
  }
`;
export const TextTemplate = styled("div")`
  width: 100%;
  margin-top: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 25px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  span {
    padding: 3px 10px;
    background: black;
    color: #ffffff;
    font-size: 12px;
  }
`;
