import { ApplicationActEnum } from './enum';
import { ApplicationType } from './model';
import { DateRangeType } from './state';

export class ApplicationActionTS {
  public static OnHandleMenuItem(
    menuItem: string,
    active: boolean = false,
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
    active: boolean = false,
  ): ApplicationType {
    return {
      type: ApplicationActEnum.MENU_MOBILE_TOGGLE,
      payload: active,
    };
  }

  public static OnHandleChangeDateRange(
    dateRange: DateRangeType,
  ): ApplicationType {
    return {
      type: ApplicationActEnum.SET_DATE_RANGE,
      payload: dateRange,
    };
  }
}
