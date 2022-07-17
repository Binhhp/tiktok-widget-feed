import { ButtonWidgetActEnum } from "./enum";
import { ButtonWidgetType } from "./model";
import { ButtonWidgetStoreModel, ButtonWidgetStoreModelDto } from "./state";

const OnSetOption = (
  state: ButtonWidgetStoreModel,
  payload: ButtonWidgetStoreModelDto
) => {
  let copyState = state.Clone();
  if (payload.id !== undefined) copyState.id = payload.id;
  if (payload.isEnabled !== undefined) copyState.isEnabled = payload.isEnabled;
  if (payload.step !== undefined) copyState.step = payload.step;
  if (payload.userName !== undefined) copyState.userName = payload.userName;
  if (payload.image !== undefined) copyState.image = payload.image;
  if (payload.position) {
    copyState.position = { ...copyState.position, ...payload.position };
  }
  if (payload.theme) copyState.theme = payload.theme;
  if (payload.timeZone) copyState.timeZone = payload.timeZone;
  return copyState;
};

const ButtonWidgetReducer = (
  state: ButtonWidgetStoreModel = new ButtonWidgetStoreModel(),
  action: ButtonWidgetType
): ButtonWidgetStoreModel => {
  switch (action.type) {
    case ButtonWidgetActEnum.OPTION:
      return OnSetOption(state, action.payload);
    default:
      return state;
  }
};

export default ButtonWidgetReducer;
