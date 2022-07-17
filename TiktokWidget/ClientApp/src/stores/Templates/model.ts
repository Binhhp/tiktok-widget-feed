import { ITikTokVideoDto } from "Dependencies/LayoutTemplate/LayoutTemplateModel";
import { TemplateStoreActEnum } from "./enum";

export interface IOnSetItems {
  type: typeof TemplateStoreActEnum.ITEMS;
  payload: ITikTokVideoDto[];
  id: string;
}

export interface IOnClearState {
  type: typeof TemplateStoreActEnum.CLEAR;
}

export interface IOnActiveItem {
  type: typeof TemplateStoreActEnum.ITEM_ACTIVE;
  payload: IItemActive;
  id: string;
}

export interface IOnSetPageState {
  type: typeof TemplateStoreActEnum.PAGE_NUMBER;
  payload: IPageState;
  id: string;
}

export type TemplateStoreType =
  | IOnSetItems
  | IOnActiveItem
  | IOnSetPageState
  | IOnClearState;

export interface IPageState {
  pageIndex?: number;
  count?: number;
}

export interface IItemActive {
  realIndex: number;
  active: boolean;
}
