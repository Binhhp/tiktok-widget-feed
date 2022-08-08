import { ISettingProviderWidget } from "./state";
import { WidgetActEnum } from "./enum";
import { BaseProduct } from "repositories/dtos/responses/BaseProduct";

export interface IOnStep {
  type: typeof WidgetActEnum.STEP;
  payload: number;
}
export interface IOnSetting {
  type: typeof WidgetActEnum.SETTING;
  payload: ISettingProviderWidget | boolean;
}

export interface IOnHandleMobile {
  type: typeof WidgetActEnum.MOBILE;
  payload: boolean;
}

export interface IGetTagProducts {
  type: typeof WidgetActEnum.GET_TAG_PRODUCTS;
  payload: BaseProduct[];
  isReplace: boolean;
}

export interface ISetWidgetCount {
  type: typeof WidgetActEnum.COUNT;
  payload: number | undefined;
}

export type WidgetType =
  | IOnStep
  | IOnSetting
  | IOnHandleMobile
  | IGetTagProducts
  | ISetWidgetCount;
