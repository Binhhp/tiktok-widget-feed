import { ApplicationActEnum } from './enum';
import { ApplicationType } from './model';
import { ApplicationStoreModel, DateRangeType } from './state';

const OnHandleMenuItemSelected = (
  state: ApplicationStoreModel,
  payload: {
    menuItem: string;
    active: boolean;
  },
) => {
  let copyState = state.Clone();
  if (payload.active) {
    copyState.menuActive = payload.menuItem;
  }
  if (!copyState.menuItems.includes(payload.menuItem)) {
    copyState.menuItems.push(payload.menuItem);
  } else {
    copyState.menuItems = copyState.menuItems.filter(
      (x) => x !== payload.menuItem,
    );
  }
  return copyState;
};

const OnHandleMenuItemMobileSelected = (
  state: ApplicationStoreModel,
  payload: boolean = false,
) => {
  let copyState = state.Clone();
  copyState.mobileMenuView = payload;
  return copyState;
};

const OnHandleChangeDateRangeSelected = (
  state: ApplicationStoreModel,
  payload: DateRangeType,
) => {
  let copyState = state.Clone();
  copyState.dateRange = payload;
  return copyState;
};

const ApplicationReducer = (
  state: ApplicationStoreModel = new ApplicationStoreModel(),
  action: ApplicationType,
): ApplicationStoreModel => {
  switch (action.type) {
    case ApplicationActEnum.MENU_TOGGLE:
      return OnHandleMenuItemSelected(state, action.payload);
    case ApplicationActEnum.MENU_MOBILE_TOGGLE:
      return OnHandleMenuItemMobileSelected(state, action.payload);
    case ApplicationActEnum.SET_DATE_RANGE:
      return OnHandleChangeDateRangeSelected(state, action.payload);
    default:
      return state;
  }
};

export default ApplicationReducer;
