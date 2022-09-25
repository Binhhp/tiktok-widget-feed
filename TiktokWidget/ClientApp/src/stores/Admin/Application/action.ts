import { ApplicationActEnum } from "./enum";
import { ApplicationType } from "./model";

export class ApplicationActionTS {
  public static OnHandleMenuItem(
    menuItem: string,
    active: boolean = false
  ): ApplicationType {
    return {
      type: ApplicationActEnum.MENU_TOGGLE,
      payload: {
        menuItem,
        active,
      },
    };
  }

  public static OnHandleMenuItemMobile(
    active: boolean = false
  ): ApplicationType {
    return {
      type: ApplicationActEnum.MENU_MOBILE_TOGGLE,
      payload: active,
    };
  }
}
