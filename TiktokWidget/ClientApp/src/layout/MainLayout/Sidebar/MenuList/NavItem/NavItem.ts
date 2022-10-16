import { IMenuChildrens } from "menu-items/MenuModel";

export interface INavItemProps {
  level: number;
  disabled?: boolean;
  key: string;
  item?: IMenuChildrens;
  icon?: any;
  selected?: boolean;
  active?: boolean;
}

export interface IPropListItemButton {
  level: number;
}
