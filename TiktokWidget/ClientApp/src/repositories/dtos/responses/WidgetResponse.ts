import { BaseProduct } from "./BaseProduct";
import { BaseShop } from "./BaseShop";

export interface IWidgetResponse {
  id: string;
  shopId: string;
  widgetTitle: string;
  sourceType: string;
  valueSource: string;
  products: BaseProduct[];
  shops: BaseShop;
  setting: ISettingValueObject;
  header: IHeaderValueObject;
  createDate: string;
  modifyDate: string;
}

export interface ISettingValueObject {
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

export interface IHeaderValueObject {
  enable: boolean;
  title: string;
  caption: string;
}
