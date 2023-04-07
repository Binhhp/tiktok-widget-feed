import { IInstagramWidget, InstagramWidgetStatus } from "./state";
import { InstagramWidgetActEnum } from "./enum";
import { ProductResponse } from "repositories/dtos/responses/ProductResponse";

export interface IOnStep {
  type: typeof InstagramWidgetActEnum.STEP;
  payload: number;
}
export interface IOnSetting {
  type: typeof InstagramWidgetActEnum.SETTING;
  payload: IInstagramWidget | boolean;
}

export interface IOnHandleMobile {
  type: typeof InstagramWidgetActEnum.MOBILE;
  payload: boolean;
}

export interface IGetTagProducts {
  type: typeof InstagramWidgetActEnum.GET_TAG_PRODUCTS;
  payload: ProductResponse[];
  isReplace: boolean;
}

export interface ISetWidgetCount {
  type: typeof InstagramWidgetActEnum.COUNT;
  payload: number | undefined;
}

export interface IChangeStatus {
  type: typeof InstagramWidgetActEnum.CHANGE_STATUS;
  payload: InstagramWidgetStatus;
}

export interface RiseSequenceNumber {
  type: typeof InstagramWidgetActEnum.RISE_SEQUENCENUMBER;
}

export interface SearchingVideos {
  type: typeof InstagramWidgetActEnum.SEARCHING;
  payload: boolean;
}
export type InstagramWidgetType =
  | IOnStep
  | IOnSetting
  | IOnHandleMobile
  | IGetTagProducts
  | ISetWidgetCount
  | IChangeStatus
  | RiseSequenceNumber
  | SearchingVideos;
