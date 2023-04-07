import { ProductResponse } from "repositories/dtos/responses/ProductResponse";

export interface IOnBoardingPresenProps {
  selected: number;
  handleTabChange: any;
  tabs: any[];
  loadingNext?: boolean;
  onSkipBoarding: () => void;
  step: number;
  onSetstep: (step: number) => void;
  onNext: () => void;
  //callback func submit follow step
  setActionFunc: (actionSubmit: actionCallback) => void;
  //handle widget type(Tiktok or Instagram)
  widgetType: WidgetType;
  setWidgetType: (typeSelected: WidgetType) => () => void;
  //add tag product
  product: TagProductType;
  setProduct: (active?: boolean, product?: ProductResponse | null) => void;

  //enable app
  enableApp: boolean;
  setEnableApp: () => void;

  //set video unshow
  videoUnchecked: string[];
  setVideoUnChecked: (items: string[]) => void;
  //set video sorted
  videoSorted: string[];
  setVideoSorted: (items: string[]) => void;
}

export type TagProductType = {
  active?: boolean;
  data?: ProductResponse;
};

export interface TabProps {
  step: number;
  widgetType: number;

  videoUnchecked: string[];
  setVideoUnChecked: (items: string[]) => void;
  //set video sorted
  videoSorted: string[];
  setVideoSorted: (items: string[]) => void;

  setWidgetType: (type: WidgetType) => () => void;
  setActionFunc: (actionSubmit: actionCallback) => void;

  product?: TagProductType;
  setProduct?: (active?: boolean, product?: ProductResponse | null) => void;
  onNext: () => void;
  //enable app
  enableApp: boolean;
  setEnableApp: () => void;
}

export enum WidgetType {
  Tiktok = 0,
  Instagram = 1,
}
export type actionCallback = (type: WidgetType) => boolean;

export interface FormSettingProp {
  error: any;
  setError: (key: string, val: any) => void;
}
