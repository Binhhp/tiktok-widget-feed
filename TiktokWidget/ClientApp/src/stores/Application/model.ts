import { ApplicationActEnum } from "./enum";

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

export type ApplicationType = OnMenuItem | OnMenuItemMobile;
