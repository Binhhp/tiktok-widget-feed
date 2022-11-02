import { ITikTokVideoDto, IVideoTemplateModel } from "./LayoutTemplateModel";

export enum TemplateType {
  Slider,
  Carousel,
  List,
  Masonry,
}
export interface IItemState {
  title: string;
  time: string;
  hashtag: string[];
  comment: number;
  heart: number;
  image: string;
}
export interface ITemplateProps {
  autoplay?: boolean | number;
  showItems?: number;
  showLoadInfinite?: boolean;
  circleLoading?: boolean;
  row?: number;
  type: TemplateType;
  contentOverflow?: boolean;
  options?: ITemplate;
  flexDirection?: "row" | "column";
  imgHeight?: number;
  hiddenContent?: boolean;
  _queryData: (
    pageIndex: number,
    showItems?: number
  ) => Promise<IVideoTemplateModel>;
  clickRender?: (index: number) => void;
  onNotFound?: () => JSX.Element;
  enableHover?: boolean;
  style?: ITemplateStyle;
  disableContext?: boolean;
  showAll?: boolean;
}

interface ITemplateStyle {
  pt?: number;
  pr?: number;
  pl?: number;
  pb?: number;
  pbInfinite?: number;
  mtInfinite?: number;
  mrInfinite?: number;
  mlInfinite?: number;
  mbInfinite?: number;
  zIndex?: number;
}

export interface ITemplate {
  readMore?: string;
  bg?: string;
  color?: string;
  showNetworkIcon?: "enable" | "disable";
  accentColor?: string;
  viewMore?: string;
  row?: number;
}

export class TemplateProvider {
  public static icon: number = 11;
}

export interface ITemplateImage {
  flexDirection?: "row" | "column";
  imgHeight?: number | string;
  height?: number;
}

export interface ITemplateType {
  type: TemplateType;
  width?: number;
  widthItem?: string;
  contentOverflow?: boolean;
  bg?: string;
  imgHeight?: number | string;
  isHidden?: boolean;
  color?: string;
  flexDirection?: "row" | "column";
  mt?: number;
  mr?: number;
  ml?: number;
  mb?: number;
  pt?: number;
  pr?: number;
  pl?: number;
  pb?: number;
  pbInfinite?: number;
  mtInfinite?: number;
  mrInfinite?: number;
  mlInfinite?: number;
  mbInfinite?: number;
  zIndex?: number;
}

export interface ITemplateItem {
  hiddenContent?: boolean;
  item: ITikTokVideoDto;
  index: number;
  options?: ITemplate;
  type: TemplateType;
  contentOverflow?: boolean;
  width?: number;
  widthItem?: string;
  grid?: boolean;
  imgHeight?: number | string;
  flexDirection?: "row" | "column";
  isHidden?: boolean;
  showAllHashTag?: boolean;
  showDesc?: boolean;
  bg?: string;
  mt?: number;
  mr?: number;
  ml?: number;
  mb?: number;
  pt?: number;
  pr?: number;
  pl?: number;
  pb?: number;
  enableHover?: boolean;
  zIndex?: number;
  clickRender: (index: number) => () => void;
}

export interface ITextItem {
  showDesc?: boolean;
}

interface ILayoutProps {
  onClickLayoutRender: (index: number) => () => void;
  fetchData: () => void;
  loadingButton: boolean;
  showAll?: boolean;
}
export interface IHashtagItem {
  color: string;
  showAll?: boolean;
}

export interface IUserSocialInfo {
  left?: boolean;
  right?: boolean;
}

export type TemplateControlType = Pick<
  ITemplateType,
  "mt" | "mb" | "ml" | "mr" | "pt" | "pb" | "pl" | "pr"
>;
export interface ITemplateSkeleton {
  row?: number;
}
export type LayoutPropTypes = ILayoutProps & ITemplateProps;
