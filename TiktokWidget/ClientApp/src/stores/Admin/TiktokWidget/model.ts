import { ISettingProviderWidget, WidgetStatus } from "./state";
import { WidgetActEnum } from "./enum";
import { ProductResponse } from "repositories/dtos/responses/ProductResponse";

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
  payload: ProductResponse[];
  isReplace: boolean;
}

export interface ISetWidgetCount {
  type: typeof WidgetActEnum.COUNT;
  payload: number | undefined;
}

export interface IChangeStatus {
  type: typeof WidgetActEnum.CHANGE_STATUS;
  payload: WidgetStatus;
}

export interface RiseSequenceNumber {
  type: typeof WidgetActEnum.RISE_SEQUENCENUMBER;
}

export interface SearchingVideos {
  type: typeof WidgetActEnum.SEARCHING;
  payload: boolean;
}

export type WidgetType =
  | IOnStep
  | IOnSetting
  | IOnHandleMobile
  | IGetTagProducts
  | ISetWidgetCount
  | IChangeStatus
  | RiseSequenceNumber
  | SearchingVideos;
