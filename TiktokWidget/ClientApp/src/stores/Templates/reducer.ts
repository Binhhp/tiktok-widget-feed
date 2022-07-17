import { ITikTokVideoDto } from "Dependencies/LayoutTemplate/LayoutTemplateModel";
import { TemplateStoreActEnum } from "./enum";
import { IItemActive, IPageState, TemplateStoreType } from "./model";
import { TemplateStoreModel } from "./state";

export type TemplateReducerType = TemplateStoreModel[];

const OnSetItems = (
  id: string,
  state: TemplateReducerType,
  payload: ITikTokVideoDto[]
): TemplateReducerType => {
  let stateCurrent = state.filter((x) => x.id === id);
  if (stateCurrent?.length > 0) {
    let copyState = stateCurrent[0].Clone();
    copyState.items = [...copyState.items, ...payload];
    state = [...state.filter((x) => x.id !== id), copyState];
  } else {
    let templateModel = new TemplateStoreModel();
    templateModel.id = id;
    templateModel.items = [...payload];
    templateModel.user = {
      author: payload[0].author,
      avatarThumb: payload[0].avatarThumb,
      followerCount: payload[0].authorStats?.followerCount,
      followingCount: payload[0].authorStats?.followingCount,
      diggCount: payload[0].authorStats?.diggCount,
    };
    state.push(templateModel);
  }
  return state;
};

const OnActiveItem = (
  id: string,
  state: TemplateReducerType,
  payload: IItemActive
): TemplateReducerType => {
  let stateCurrent = state.filter((x) => x.id === id);
  if (stateCurrent?.length > 0) {
    let copyState = stateCurrent[0].Clone();
    copyState.index = payload;
    state = [...state.filter((x) => x.id !== id), copyState];
  } else {
    let templateModel = new TemplateStoreModel();
    templateModel.id = id;
    templateModel.index = payload;
    state.push(templateModel);
  }
  return state;
};

const OnSetPage = (
  id: string,
  state: TemplateReducerType,
  payload: IPageState
): TemplateReducerType => {
  let stateCurrent = state.filter((x) => x.id === id);
  if (stateCurrent.length > 0) {
    let copyState = stateCurrent[0].Clone();
    if (payload.pageIndex) copyState.pageIndex += payload.pageIndex;
    if (payload.count) copyState.count = payload.count;
    state = [...state.filter((x) => x.id !== id), copyState];
  } else {
    let templateModel = new TemplateStoreModel();
    templateModel.id = id;
    if (payload.pageIndex) templateModel.pageIndex += payload.pageIndex;
    if (payload.count) templateModel.count = payload.count;
    state.push(templateModel);
  }
  return state;
};

const OnClearState = (state: TemplateReducerType): TemplateReducerType => {
  state = [];
  return state;
};

const TemplateStoreReducer = (
  state: TemplateReducerType = [],
  action: TemplateStoreType
): TemplateReducerType => {
  switch (action.type) {
    case TemplateStoreActEnum.ITEMS:
      return OnSetItems(action.id, state, action.payload);
    case TemplateStoreActEnum.ITEM_ACTIVE:
      return OnActiveItem(action.id, state, action.payload);
    case TemplateStoreActEnum.PAGE_NUMBER:
      return OnSetPage(action.id, state, action.payload);
    case TemplateStoreActEnum.CLEAR:
      return OnClearState(state);
    default:
      return state;
  }
};

export default TemplateStoreReducer;
