import { ApplicationActEnum } from './enum';
import { DateRangeType } from './state';

export interface OnMenuItem {
  type: typeof ApplicationActEnum.MENU_TOGGLE;
  payload: {
    menuItem: string;
    active: boolean;
  };
}

export interface OnMenuItemMobile {
  type: typeof ApplicationActEnum.MENU_MOBILE_TOGGLE;
  payload: boolean;
}

export interface OnHandleChangeDateRange {
  type: typeof ApplicationActEnum.SET_DATE_RANGE;
  payload: DateRangeType;
}
export type ApplicationType =
  | OnMenuItem
  | OnMenuItemMobile
  | OnHandleChangeDateRange;
