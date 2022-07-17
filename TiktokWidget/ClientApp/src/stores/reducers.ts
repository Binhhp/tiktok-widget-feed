import { combineReducers } from "redux";
import ApplicationReducer from "./Application/reducer";
import ButtonWidgetReducer from "./ButtonWidget/reducer";
import ShopReducer from "./Shop/reducer";
import TemplateStoreReducer from "./Templates/reducer";
import WidgetReducer from "./Widget/reducer";

const rootStateProvider = {
  appReducer: ApplicationReducer,
  widgetReducer: WidgetReducer,
  buttonWidgetReducer: ButtonWidgetReducer,
  templateStoreReducer: TemplateStoreReducer,
  shopReducer: ShopReducer,
};

const reducer = combineReducers(rootStateProvider);
export type RootReducer = ReturnType<typeof reducer>;
export default reducer;
