import { RootReducer } from "stores/Admin/reducers";

export interface INavItemProps {
  level: number;
  disabled?: boolean;
  id: string;
  title: string;
  chip?: {
    nameReducer: keyof RootReducer;
  };
  icon?: any;
  selected?: boolean;
  redirect?: boolean;
  url: string;
}

export interface IPropListItemButton {
  level: number;
}
