import styled from "Dependencies/StyledComponents/Container";

export const StepThreeWrapper = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const StepThreeSection = styled("div")`
  width: 30%;
`;

export const AlertSuccess = styled("div")`
  padding-right: 15px;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  border: 1px solid rgba(149, 201, 180, 1);
  padding: 13px 20px;
  background: rgba(241, 248, 245, 1);
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 50px;
  span {
    margin: 0px 20px 0px 0px;
  }
`;

export interface ISupportHelperText {
  fontSize?: number;
  fontWeight?: number;
  textAlign?: "left" | "center" | "right";
  fontStyle?: "italic" | "normal" | "oblique";
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
}
export const SupportHelperText = styled("div")<ISupportHelperText>`
  font-size: ${(props) => props.fontSize || 13}px;
  font-weight: ${(props) => props.fontWeight || 400};
  width: 100%;
  text-align: ${(props) => props.textAlign || "right"};
  margin: ${(props) => props.mt || 0}px ${(props) => props.mr || 0}px
    ${(props) => props.mb || 0}px ${(props) => props.ml || 0}px;
  font-style: ${(props) => props.fontStyle || "normal"};
`;

export const TabMethods = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export interface ITabItemWrapper {
  borderColor?: string;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
}
export const TabItemWrapper = styled("div")<ITabItemWrapper>`
  padding-left: 10px;
  width: 60%;
  margin: ${(props) => props.mt || 0}px ${(props) => props.mr || 0}px
    ${(props) => props.mb || 0}px ${(props) => props.ml || 0}px;
  border-left: 2.5px solid ${(props) => props.borderColor || "#000000"};
`;
export interface ITabItem {
  bg?: string;
  color?: string;
}
export const TabItem = styled("div")<ITabItem>`
  background: ${(props) => props.bg || "#DFDFDF"};
  padding: 8px 10px;
  color: ${(props) => props.color || "#000000"};
  font-size: 14px;
  text-align: left;
  cursor: pointer;
`;

export const CopySelection = styled("div")`
  background: #fafafa;
  padding: 10px;
  margin-bottom: 30px;
`;

export const CopyContent = styled("div")`
  display: flex;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 5px;
  position: relative;
  div {
    color: #a4a4a4;
  }
  svg {
    fill: #5c5f62;
  }
`;

export interface ICopyButton {
  isCopy?: boolean;
}
export const CopyButton = styled("div")<ICopyButton>`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  svg {
    fill: ${(props) => (!props.isCopy ? "#5c5f62" : "rgba(0, 127, 95, 1)")};
  }
`;

export const ButtonWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
`;

export const MediaCardWrapper = styled("div")`
  .Polaris-MediaCard {
    display: block;
    padding: 15px;
  }
  .Polaris-Card__Section {
    padding-left: 0px;
  }
`;

export const SectionWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CardBody = styled("div")`
  margin-bottom: 30px;
`;
