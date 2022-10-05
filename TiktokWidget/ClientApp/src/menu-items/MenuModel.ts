import { WidgetStoreModel } from "stores/Admin/Widget/state";

export enum MenuItemType {
  Group,
  Item,
}
export interface IMenuChildrens {
  id: string;
  title: string;
  type: MenuItemType;
  url?: string;
  redirect?: boolean;
  icon?: any;
  disabled?: boolean;
  chip?: keyof WidgetStoreModel;
}
export interface IMenuItems {
  id: string;
  title: string;
  type: MenuItemType;
  icon: any;
  url?: string;
  label?: string;
  children?: IMenuChildrens[];
}
