import { BaseProduct } from "repositories/dtos/responses/BaseProduct";
import { InstagramWidgetActEnum } from "./enum";
import { InstagramWidgetType } from "./model";
import { IInstagramWidget, InstagramWidgetStatus } from "./state";

export class InstagramWidgetActionTS {
  public static OnSetWidgetCount(
    count: number | undefined
  ): InstagramWidgetType {
    return {
      type: InstagramWidgetActEnum.COUNT,
      payload: count,
    };
  }

  public static OnChangStatus(
    status: InstagramWidgetStatus = "Undefined"
  ): InstagramWidgetType {
    return {
      type: InstagramWidgetActEnum.CHANGE_STATUS,
      payload: status,
    };
  }

  public static OnStep(step: number = 0): InstagramWidgetType {
    return {
      type: InstagramWidgetActEnum.STEP,
      payload: step,
    };
  }

  public static OnSetSetting(
    step: IInstagramWidget | boolean
  ): InstagramWidgetType {
    return {
      type: InstagramWidgetActEnum.SETTING,
      payload: step,
    };
  }

  public static OnHandleMobile(mobile: boolean = false): InstagramWidgetType {
    return {
      type: InstagramWidgetActEnum.MOBILE,
      payload: mobile,
    };
  }

  public static OnSetTagProducts(
    products: BaseProduct[],
    isReplace: boolean = false
  ): InstagramWidgetType {
    return {
      type: InstagramWidgetActEnum.GET_TAG_PRODUCTS,
      payload: products,
      isReplace: isReplace,
    };
  }
}
