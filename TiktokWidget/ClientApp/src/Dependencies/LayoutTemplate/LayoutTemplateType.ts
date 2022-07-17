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
  id: string;
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
  _queryData: (pageIndex: number) => Promise<IVideoTemplateModel>;
  clickRender?: (index: number) => void;
  onNotFound?: () => JSX.Element;
  enableHover?: boolean;
  style?: ITemplateStyle;
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
}

export class TemplateProvider {
  public static icon: number = 9;
}

export interface ITemplateImage {
  flexDirection?: "row" | "column";
  imgHeight?: number | string;
}

export interface ITemplateType {
  type: TemplateType;
  width?: number;
  widthItem?: number;
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
  widthItem?: number;
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
}

export type LayoutPropTypes = ILayoutProps & ITemplateProps & { id: string };
