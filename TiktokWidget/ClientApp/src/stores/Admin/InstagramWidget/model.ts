import { IInstagramWidget, InstagramWidgetStatus } from "./state";
import { InstagramWidgetActEnum } from "./enum";
import { BaseProduct } from "repositories/dtos/responses/BaseProduct";

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
  payload: BaseProduct[];
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

export type InstagramWidgetType =
  | IOnStep
  | IOnSetting
  | IOnHandleMobile
  | IGetTagProducts
  | ISetWidgetCount
  | IChangeStatus;
