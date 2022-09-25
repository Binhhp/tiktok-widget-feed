import { ButtonWidgetStoreModelDto } from "./state";
import { ButtonWidgetActEnum } from "./enum";

export interface IOnSetOption {
  type: typeof ButtonWidgetActEnum.OPTION;
  payload: ButtonWidgetStoreModelDto;
}

export type ButtonWidgetType = IOnSetOption;
