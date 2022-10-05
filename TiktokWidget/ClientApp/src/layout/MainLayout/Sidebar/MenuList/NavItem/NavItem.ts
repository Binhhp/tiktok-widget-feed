import { IMenuChildrens } from "menu-items/MenuModel";

export interface INavItemProps {
  level: number;
  disabled?: boolean;
  key: string;
  item?: IMenuChildrens;
  icon?: any;
  chip?: string;
  selected?: boolean;
}

export interface IPropListItemButton {
  level: number;
}
