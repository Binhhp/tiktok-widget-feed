import { ProductResponse } from "./ProductResponse";
import { ShopResponse } from "./ShopResponse";

export interface TiktokWidgetResponse {
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
  labelViewMore: string;
  showProfile: boolean;
  showNetworkIcon: boolean;
  accentColor: string;
  backGround: string;
  color: string;
  numberPerRow: number;
  customCss: string;
  numberItems: number;
  disableTopNewItems: boolean;
}

export interface IOptionInstagramOwner {
  layoutType: number;
  labelReadMore: string;
  labelViewMore: string;
  showProfile: boolean;
  showNetworkIcon: boolean;
  accentColor: string;
  backGround: string;
  color: string;
  numberPerRow: number;
}
export interface IHeaderOwner {
  enable: boolean;
  title: string;
  caption: string;
}
