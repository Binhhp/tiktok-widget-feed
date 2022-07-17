import { ButtonWidgetStoreModelDto } from "./state";
import { ButtonWidgetActEnum } from "./enum";
import { ButtonWidgetType } from "./model";

export class ButtonWidgetActionTS {
  public static OnSetOptional(
    options: ButtonWidgetStoreModelDto
  ): ButtonWidgetType {
    return {
      type: ButtonWidgetActEnum.OPTION,
      payload: options,
    };
  }
}
