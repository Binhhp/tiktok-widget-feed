import breakpoints from "Dependencies/Devices/breakpoint";
import styled from "Dependencies/StyledComponents/Container";

export interface ITemplateItemImage {
  width?: number;
}

export interface ITemplateTem {
  isActive?: boolean;
  height?: number;
}

export const TemplateLayoutWrapper = styled("div")`
  width: 100%;
  height: max-content;
`;

export const TemplateContainer = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding-top: 46px;
`;

export const TemplateItem = styled("div")`
  width: calc(50% - 10px);
  height: 160px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin-bottom: 10px;
  position: relative;
  cursor: pointer;
  border: 1px solid ${(props) => (props.isActive ? "#000000" : "#CCCCCC")};
  @media only screen and (${breakpoints.device.bigLg}) {
    height: ${(props) => (props.height ? props.height + 100 : 260)}px;
  }
`;

export const TemplateItemImage = styled("div")<ITemplateItemImage>`
  height: calc(100% - 50px);
  position: relative;
  margin: 30px 0px;
  @media only screen and (${breakpoints.device.bigLg}) {
    height: calc(100% - 100px);
    margin: 50px 0px;
  }
  img {
    padding: 0 1px;
    width: ${(props) => props.width || 100}%;
    height: 100%;
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
  span {
    padding: 0px 12px;
    background: black;
    color: #ffffff;
    font-size: 12px;
  }
`;

export const FormSubmitWrapper = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 98px;
  button:first-child {
    color: #000000;
  }
  button + button {
    margin-left: 15px;
    color: #ffffff;
  }
`;
