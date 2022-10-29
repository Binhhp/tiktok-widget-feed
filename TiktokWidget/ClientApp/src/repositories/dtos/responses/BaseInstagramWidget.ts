import { BaseProduct } from "./BaseProduct";
import { BaseShop } from "./BaseShop";

export interface BaseInstagramWidget {
  id: string;
  shopId: string;
  widgetTitle: string;
  sourceType: string;
  valueSource: string;
  products: BaseProduct[];
  shops: BaseShop;
  setting: IOptionOwner;
  header: IHeaderOwner;
  createDate: string;
  modifyDate: string;
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
}

export interface IHeaderOwner {
  enable: boolean;
  title: string;
}
