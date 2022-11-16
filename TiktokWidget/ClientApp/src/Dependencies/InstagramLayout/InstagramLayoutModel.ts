import { BaseInstagramWidget } from "repositories/dtos/responses/BaseInstagramWidget";
import {
  IInstagramWidget,
  TemplateInstagramType,
} from "stores/Admin/InstagramWidget/state";

export interface IInstagramLayoutView {
  disableContext?: boolean;
  option: InstagramOption;
  style?: IStyleInstagram;
  customLoader?: any;
  notLoadmore?: boolean;
  showLoadInfinite?: boolean;
  showPageFirst?: boolean;
  defaultLoadingButton?: boolean;
  nonAppend?: boolean;
  _queryData: (
    pageIndex: number,
    showItems?: number
  ) => Promise<IInstagramTemplateModel>;
  onClickItem?: (item: IInstagramDto) => () => void;
  onLoadmore?: () => void;
  customEmpty?: any;
}

export interface IStyleInstagram {
  height?: string;
}
export class InstagramOption {
  type: TemplateInstagramType.List | TemplateInstagramType.Slider;
  title?: string;
  numberPerRow: number;
  showNetworkIcon: boolean;
  labelReadMore: string;
  labelLoadmore: string;
  loadMoreBackground: string;
  itemBackground: string;
  itemColor: string;
  header: boolean;
  constructor(dto?: BaseInstagramWidget) {
    this.title = dto?.header.title ?? "";
    this.type =
      dto?.setting.layoutType === 1
        ? TemplateInstagramType.Slider
        : TemplateInstagramType.List;
    this.itemBackground = dto?.setting.itemBackGround ?? "";
    this.numberPerRow = dto?.setting.numberPerRow ?? 0;
    this.showNetworkIcon = dto?.setting.showNetworkIcon ?? false;
    this.labelReadMore = dto?.setting.labelReadMore ?? "";
    this.loadMoreBackground = dto?.setting.loadMoreBackGround ?? "";
    this.itemColor = dto?.setting.itemColor ?? "";
    this.header = dto?.header.enable ?? true;
    this.labelLoadmore = dto?.setting.labelLoadMore ?? "Load more";
  }
  ToDo = (dto: IInstagramWidget): InstagramOption => {
    this.title = dto.titleHeader;
    this.type =
      dto?.layout === 1
        ? TemplateInstagramType.Slider
        : TemplateInstagramType.List;
    this.itemBackground = dto.itemBackground ?? "";
    this.numberPerRow = dto.numberItemPerRow ?? 0;
    this.showNetworkIcon = dto.showNetworkIcon === "enable";
    this.labelReadMore = dto.labelReadMore ?? "";
    this.loadMoreBackground = dto.loadMoreBackground ?? "";
    this.itemColor = dto.itemColor ?? "";
    this.header = dto?.header === "enable" ?? true;
    this.labelLoadmore = dto?.labelLoadMore ?? "Load more";
    return this;
  };
}

export const StyledConfig = {
  MARGIN_CONTENT: 5,
};
export interface IInstagramTemplateModel {
  data: IInstagramDto[];
  count: number;
}

export interface IInstagramDto {
  dimensionWidth: number;
  dimensionHeight: number;
  likeCount: number;
  commentCount: number;
  id: string;
  type: string;
  locationId: string;
  locationName: string;
  locationSlug: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  imageUrl?: string;
  imageUrlArr?: string[];
  description: string;
  shortCode: string;
  takenAt: number;
  user?: IUserInformation;
  hashTag?: string[];
}
export interface IUserInformation {
  id?: string;
  name?: string;
  picture?: string;
  isPrivate?: boolean;
}

export interface IItemActive {
  realIndex: number;
  active: boolean;
}

export interface ITemplateStoreModel {
  items: IInstagramDto[];
  index: IItemActive;
  pageIndex: number;
  count: number;
  user: IUserInformation;
}
export class TemplateStoreModel implements ITemplateStoreModel {
  items: IInstagramDto[];
  index: IItemActive;
  pageIndex: number;
  count: number;
  user: IUserInformation;
  constructor() {
    this.items = [];
    this.index = {
      realIndex: 0,
      active: false,
    };
    this.pageIndex = 1;
    this.count = 0;
    this.user = {};
  }
}
