import { ProductResponse } from "repositories/dtos/responses/ProductResponse";
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

  public static SetWorkingSearch(isSearching: boolean): InstagramWidgetType {
    return {
      type: InstagramWidgetActEnum.SEARCHING,
      payload: isSearching,
    };
  }

  public static RiseSequenceNumber(): InstagramWidgetType {
    return {
      type: InstagramWidgetActEnum.RISE_SEQUENCENUMBER,
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
    options: IInstagramWidget | boolean
  ): InstagramWidgetType {
    return {
      type: InstagramWidgetActEnum.SETTING,
      payload: options,
    };
  }

  public static OnHandleMobile(mobile: boolean = false): InstagramWidgetType {
    return {
      type: InstagramWidgetActEnum.MOBILE,
      payload: mobile,
    };
  }

  public static OnSetTagProducts(
    products: ProductResponse[],
    isReplace: boolean = false
  ): InstagramWidgetType {
    return {
      type: InstagramWidgetActEnum.GET_TAG_PRODUCTS,
      payload: products,
      isReplace: isReplace,
    };
  }
}
