export interface IProfileProps {
  style?: IProfileStyle;
  hiddenFollower?: boolean;
  profileInfo?: ProfileInfo;
  default?: boolean;
  onClickFollow?: (status: boolean) => void;
}

export interface ProfileInfo {
  avt?: string;
  name?: string;
  following?: number;
  followers?: number;
  like?: number;
}
interface IProfileStyle {
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  display?: "none" | "block" | "flex";
  imgWidth?: number;
  bg?: string;
  fontSize?: number;
  imgBg?: string;
  maxWidth?: number | string;
}
export interface IProfileWrapper {
  bg?: string;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  display?: "none" | "block" | "flex";
  imgWidth?: number;
  maxWidth?: number | string;
}
export interface IAvatar {
  imgWidth?: number;
}

export interface IProfileInfo {
  imgWidth?: number;
  fontSize?: number;
}
