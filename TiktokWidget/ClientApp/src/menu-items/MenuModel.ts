import { RootReducer } from "stores/Admin/reducers";

export enum MenuItemType {
  Group,
  Item,
}
export interface IMenuChildrents {
  id: string;
  title: string;
  type: MenuItemType;
  url: string;
  redirect?: boolean;
  icon?: any;
  disabled?: boolean;
  active?: boolean;
  chip?: {
    nameReducer: keyof RootReducer;
  };
}
export interface IMenuItems {
  id: string;
  title: string;
  type: MenuItemType;
  icon: any;
  url: string;
  label?: string;
  active?: boolean;
  children?: IMenuChildrents[];
}
