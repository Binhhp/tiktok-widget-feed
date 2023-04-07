import { ProductResponse } from "./ProductResponse";
import { ShopResponse } from "./ShopResponse";

export interface InstagramWidgetResponse {
  id: string;
  shopId: string;
  widgetTitle: string;
  sourceType: string;
  valueSource: string;
  products: ProductResponse[];
  shops: ShopResponse;
  setting: IOptionOwner;
  header: IHeaderOwner;
  createDate: string;
  modifyDate: string;
  disableShowItems: string[] | null;
  itemSorts: string[] | null;
  videos: number;
}

export interface IOptionOwner {
  layoutType: number;
  labelReadMore: string;
  labelLoadMore: string;
  showNetworkIcon: boolean;
  loadMoreBackGround: string;
  itemBackGround: string;
  itemColor: string;
  numberPerRow: number;
  limitItems: number;
  disableTopNewItems: boolean;
}

export interface IHeaderOwner {
  enable: boolean;
  title: string;
}
