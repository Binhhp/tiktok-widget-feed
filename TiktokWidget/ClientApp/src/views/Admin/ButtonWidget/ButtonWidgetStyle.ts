import styled from "Dependencies/StyledComponents/Container";
import { IButtonWidgetControl } from "./ButtonWidgetType";

export const ButtonWidgetWrapper = styled("div")`
  width: 100%;
  height: 100%;
  .Polaris-SkeletonPage__Page {
    position: relative;
  }
`;

export const ButtonWidgetControl = styled("div")<IButtonWidgetControl>`
  cursor: pointer;
  background: ${(props) => props.bg || "#ffffff"};
  border-radius: 4px;
  width: 70px;
  height: 70px;
  margin-right: 20px;
  border: ${(props) => `3px solid ${props.borderColor}` || "none"};
  &:hover {
    border: ${(props) => `3px solid ${props.borderColorHover}` || "none"};
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SetupStepButtonWidget = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonWidgetContainer = styled("div")`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: stretch;
  .Polaris-Labelled__LabelWrapper {
    margin-bottom: 10px;
  }
`;

export const PreviewButtonWidget = styled("div")`
  width: 100%;
  height: 100%;
  flex: 1;
  .Polaris-Card {
    height: 100%;
  }
  .Polaris-SkeletonPage__Page {
    padding: 0px;
  }
  .top-right {
    top: 12px;
    right: 0px;
  }
  .top-left {
    top: 12px;
    left: 0px;
  }
  .bottom-right {
    bottom: 12px;
    right: 12px;
  }
  .bottom-left {
    bottom: 12px;
    left: 12px;
  }
`;

export const ButtonWidgetTiktok = styled("div")`
  position: absolute;
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: transparent;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const StepAnimationButtonWidget = styled("div")`
  transition: transform 2s ease-in-out;
  margin-top: 30px;
  transform: translateY(-130%);
`;

export const ShowNotification = styled("div")`
  position: absolute;
  top: 0;
`;
