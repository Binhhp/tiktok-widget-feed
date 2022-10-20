import { BaseProduct } from "repositories/dtos/responses/BaseProduct";
import { TemplateType } from "Dependencies/LayoutTemplate/LayoutTemplateType";
import { InstagramWidgetActEnum } from "./enum";
import { InstagramWidgetType } from "./model";
import {
  IInstagramWidget,
  InstagramWidgetStatus,
  InstagramWidgetStoreModel,
} from "./state";

const OnStep = (state: InstagramWidgetStoreModel, payload: number = 0) => {
  let copyState = state.Clone();
  copyState.step = payload;
  return copyState;
};

const OnHandleMobile = (
  state: InstagramWidgetStoreModel,
  payload: boolean = false
) => {
  let copyState = state.Clone();
  copyState.mobile = payload;
  return copyState;
};
const OnSetSetting = (
  state: InstagramWidgetStoreModel,
  payload: IInstagramWidget | boolean
) => {
  let copyState = state.Clone();
  try {
    if (typeof payload !== "boolean") {
      if (payload.id) copyState.settings.id = payload.id;
      if (payload.title !== undefined) copyState.settings.title = payload.title;
      if (payload.source !== undefined)
        copyState.settings.source = payload.source;
      if (payload.valueSource !== undefined)
        copyState.settings.valueSource = payload.valueSource;
      if (payload.layout !== undefined)
        copyState.settings.layout = payload.layout || TemplateType.Slider;
      if (payload.header !== undefined)
        copyState.settings.header = payload.header;
      if (payload.titleHeader !== undefined)
        copyState.settings.titleHeader = payload.titleHeader;
      if (payload.labelReadMore !== undefined)
        copyState.settings.labelReadMore = payload.labelReadMore;
      if (payload.labelLoadMore !== undefined)
        copyState.settings.labelLoadMore = payload.labelLoadMore;
      if (payload.showNetworkIcon !== undefined)
        copyState.settings.showNetworkIcon = payload.showNetworkIcon;
      if (payload.loadMoreBackground !== undefined)
        copyState.settings.loadMoreBackground = payload.loadMoreBackground;
      if (payload.itemColor !== undefined)
        copyState.settings.itemColor = payload.itemColor;
      if (payload.itemBackground !== undefined)
        copyState.settings.itemBackground = payload.itemBackground;
      if (payload.numberItemPerRow !== undefined)
        copyState.settings.numberItemPerRow = payload.numberItemPerRow;
      if (payload.limitItems !== undefined)
        copyState.settings.limitItems = payload.limitItems;
      if (payload.products) copyState.settings.products = payload.products;
    } else {
      copyState.settings = new InstagramWidgetStoreModel().settings;
    }
  } catch (error) {
    console.log(error);
  }
  return copyState;
};

const OnGetTagProducts = (
  state: InstagramWidgetStoreModel,
  payload: BaseProduct[],
  isReplace = false
) => {
  let copyState = state.Clone();
  if (!isReplace) copyState.products = [...copyState.products, ...payload];
  else copyState.products = payload;
  return copyState;
};

const OnSetCount = (
  state: InstagramWidgetStoreModel,
  payload: number | undefined
) => {
  let copyState = state.Clone();
  copyState.count = payload;
  return copyState;
};

const OnChangeStatus = (
  state: InstagramWidgetStoreModel,
  status: InstagramWidgetStatus
) => {
  let copyState = state.Clone();
  copyState.status = status;
  return copyState;
};

const InstagramWidgetReducer = (
  state: InstagramWidgetStoreModel = new InstagramWidgetStoreModel(),
  action: InstagramWidgetType
): InstagramWidgetStoreModel => {
  switch (action.type) {
    case InstagramWidgetActEnum.STEP:
      return OnStep(state, action.payload);
    case InstagramWidgetActEnum.SETTING:
      return OnSetSetting(state, action.payload);
    case InstagramWidgetActEnum.MOBILE:
      return OnHandleMobile(state, action.payload);
    case InstagramWidgetActEnum.GET_TAG_PRODUCTS:
      return OnGetTagProducts(state, action.payload, action.isReplace);
    case InstagramWidgetActEnum.COUNT:
      return OnSetCount(state, action.payload);
    case InstagramWidgetActEnum.CHANGE_STATUS:
      return OnChangeStatus(state, action.payload);
    default:
      return state;
  }
};

export default InstagramWidgetReducer;
