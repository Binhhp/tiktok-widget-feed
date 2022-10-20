import { BaseProduct } from "repositories/dtos/responses/BaseProduct";
import { TemplateType } from "Dependencies/LayoutTemplate/LayoutTemplateType";
import { WidgetActEnum } from "./enum";
import { WidgetType } from "./model";
import {
  ISettingProviderWidget,
  WidgetStatus,
  WidgetStoreModel,
  WidgetStoreModelDto,
} from "./state";

const OnStep = (state: WidgetStoreModel, payload: number = 0) => {
  let copyState = state.Clone();
  copyState.step = payload;
  return copyState;
};

const OnHandleMobile = (state: WidgetStoreModel, payload: boolean = false) => {
  let copyState = state.Clone();
  copyState.mobile = payload;
  return copyState;
};
const OnSetSetting = (
  state: WidgetStoreModel,
  payload: ISettingProviderWidget | boolean
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
      if (payload.caption !== undefined)
        copyState.settings.caption = payload.caption;
      if (payload.labelReadMore !== undefined)
        copyState.settings.labelReadMore = payload.labelReadMore;
      if (payload.labelView !== undefined)
        copyState.settings.labelView = payload.labelView;
      if (payload.showProfile !== undefined)
        copyState.settings.showProfile = payload.showProfile;
      if (payload.showNetworkIcon !== undefined)
        copyState.settings.showNetworkIcon = payload.showNetworkIcon;
      if (payload.accentColor !== undefined)
        copyState.settings.accentColor = payload.accentColor;
      if (payload.itemColor !== undefined)
        copyState.settings.itemColor = payload.itemColor;
      if (payload.itemBackground !== undefined)
        copyState.settings.itemBackground = payload.itemBackground;
      if (payload.numberItemPerRow !== undefined)
        copyState.settings.numberItemPerRow = payload.numberItemPerRow;
      if (payload.products) copyState.settings.products = payload.products;
    } else {
      copyState.settings = new WidgetStoreModelDto().settings;
    }
  } catch (error) {
    console.log(error);
  }
  return copyState;
};

const OnGetTagProducts = (
  state: WidgetStoreModel,
  payload: BaseProduct[],
  isReplace = false
) => {
  let copyState = state.Clone();
  if (!isReplace) copyState.products = [...copyState.products, ...payload];
  else copyState.products = payload;
  return copyState;
};

const OnSetCount = (state: WidgetStoreModel, payload: number | undefined) => {
  let copyState = state.Clone();
  copyState.count = payload;
  return copyState;
};

const OnChangeStatus = (state: WidgetStoreModel, status: WidgetStatus) => {
  let copyState = state.Clone();
  if (copyState.count === 0) {
    copyState.status = status;
  } else {
    copyState.status = "Undefined";
  }
  return copyState;
};

const WidgetReducer = (
  state: WidgetStoreModel = new WidgetStoreModel(),
  action: WidgetType
): WidgetStoreModel => {
  switch (action.type) {
    case WidgetActEnum.STEP:
      return OnStep(state, action.payload);
    case WidgetActEnum.SETTING:
      return OnSetSetting(state, action.payload);
    case WidgetActEnum.MOBILE:
      return OnHandleMobile(state, action.payload);
    case WidgetActEnum.GET_TAG_PRODUCTS:
      return OnGetTagProducts(state, action.payload, action.isReplace);
    case WidgetActEnum.COUNT:
      return OnSetCount(state, action.payload);
    case WidgetActEnum.CHANGE_STATUS:
      return OnChangeStatus(state, action.payload);
    default:
      return state;
  }
};

export default WidgetReducer;
