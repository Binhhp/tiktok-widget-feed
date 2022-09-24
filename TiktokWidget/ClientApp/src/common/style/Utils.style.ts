import styled from "Dependencies/StyledComponents/Container";
import { Link } from "react-router-dom";

export interface IButtonCustom {
  size?: "small" | "medium" | "large";
  color?: string;
  bg?: string;
  borderColor?: string;
  width?: number;
  display?: "flex" | "none" | "block";
}

export const FlexBox = styled("div")`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonCustom = styled("button")<IButtonCustom>`
  display: ${(props) => props.display || "flex"};
  flex-direction: row;
  justify-content: center;
  position: relative;
  background: ${(props: IButtonCustom) => props.bg || "rgba(254, 44, 85, 1)"};
  color: ${(props: IButtonCustom) => props.color || "#ffffff"};
  padding: 7px 23px;
  border-radius: 2px;
  font-weight: 400;
  font-size: ${(props: IButtonCustom) => (props.size === "small" ? 12 : 18)}px;
  cursor: pointer;
  border: ${(props) =>
    props.borderColor ? `1px solid ${props.borderColor}` : "none"};
  border-radius: 4px;
  width: ${(props) => (props.width ? `${props.width}%` : "auto")};
`;

export const LinkRouter = styled(Link)<IButtonCustom>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  text-decoration: none;
  background: ${(props: IButtonCustom) => props.bg || "rgba(254, 44, 85, 1)"};
  color: ${(props: IButtonCustom) => props.color || "#ffffff"} !important;
  padding: 7px 23px;
  border-radius: 2px;
  font-weight: 400;
  font-size: ${(props: IButtonCustom) => (props.size === "small" ? 13 : 18)}px;
  cursor: pointer;
  border: ${(props) =>
    props.borderColor ? `1px solid ${props.borderColor}` : "none"};
  border-radius: 4px;
  width: ${(props) => (props.width ? `${props.width}%` : "max-content")};
`;

//Container Section
export interface IContainerSection {
  width: number;
  height?: number | string;
  bg?: string;
  position?: "sticky" | "absolute" | "relative" | "fixed";
  zIndex?: number;
  pt?: number | string;
  pr?: number | string;
  pb?: number | string;
  pl?: number | string;
  mt?: number | string;
  mr?: number | string;
  mb?: number | string;
  ml?: number | string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

export interface IContainer {
  flexDirection?: "row" | "column" | "column-reverse" | "row-reverse";
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  bg?: string;
  position?: "sticky" | "absolute" | "relative" | "fixed";
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around";
}
export const Container = styled("div")<IContainer>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "row"};
  justify-content: ${(props) => props.justifyContent || "baseline"};
  width: 100%;
  height: 100%;
  background: ${(props) => props.bg || "#ffffff"};
  margin: ${(props) => props.mt || 0}px ${(props) => props.mr || 0}px
    ${(props) => props.mb || 0}px ${(props) => props.ml || 0}px;
  padding: ${(props) => props.pt || 0}px ${(props) => props.pr || 0}px
    ${(props) => props.pb || 0}px ${(props) => props.pl || 0}px;
  position: ${(props) => props.position ?? "relative"};
`;

export const ContainerSection = styled("div", "section")<IContainerSection>`
  &.orichi-tiktok-section {
    width: ${(props) => props.width}%;
    height: ${(props) =>
      props.height
        ? typeof props.height === "number"
          ? `${props.height}%`
          : `${props.height}`
        : "auto"};
    background: ${(props) => props.bg || "#ffffff"};
    margin: ${(props) => props.mt || 0}px ${(props) => props.mr || 0}px
      ${(props) => props.mb || 0}px ${(props) => props.ml || 0}px;
    position: ${(props) => props.position ?? "relative"};
    z-index: ${(props) => props.zIndex ?? 0};
    top: ${(props) => `${props.top}px` ?? "none"};
    left: ${(props) => `${props.left}px` ?? "none"};
    right: ${(props) => `${props.right}px` ?? "none"};
    bottom: ${(props) => `${props.bottom}px` ?? "none"};
    padding: ${(props) =>
        props.pt
          ? typeof props.pt === "number"
            ? `${props.pt}px`
            : `${props.pt}`
          : 0}
      ${(props) =>
        props.pr
          ? typeof props.pr === "number"
            ? `${props.pr}px`
            : `${props.pr}`
          : 0}
      ${(props) =>
        props.pb
          ? typeof props.pb === "number"
            ? `${props.pb}px`
            : `${props.pb}`
          : 0}
      ${(props) =>
        props.pl
          ? typeof props.pl === "number"
            ? `${props.pl}px`
            : `${props.pl}`
          : 0};
  }
`;
