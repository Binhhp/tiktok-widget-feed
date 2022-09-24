import { BaseProduct } from "repositories/dtos/responses/BaseProduct";
import { WidgetActEnum } from "./enum";
import { WidgetType } from "./model";
import { ISettingProviderWidget, WidgetStatus } from "./state";

export class WidgetActionTS {
  public static OnSetWidgetCount(count: number | undefined): WidgetType {
    return {
      type: WidgetActEnum.COUNT,
      payload: count,
    };
  }

  public static OnChangStatus(status: WidgetStatus = "Undefined"): WidgetType {
    return {
      type: WidgetActEnum.CHANGE_STATUS,
      payload: status,
    };
  }

  public static OnStep(step: number = 0): WidgetType {
    return {
      type: WidgetActEnum.STEP,
      payload: step,
    };
  }

  public static OnSetSetting(
    step: ISettingProviderWidget | boolean
  ): WidgetType {
    return {
      type: WidgetActEnum.SETTING,
      payload: step,
    };
  }

  public static OnHandleMobile(mobile: boolean = false): WidgetType {
    return {
      type: WidgetActEnum.MOBILE,
      payload: mobile,
    };
  }

  public static OnSetTagProducts(
    products: BaseProduct[],
    isReplace: boolean = false
  ): WidgetType {
    return {
      type: WidgetActEnum.GET_TAG_PRODUCTS,
      payload: products,
      isReplace: isReplace,
    };
  }
}
