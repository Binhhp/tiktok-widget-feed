import { combineReducers } from "redux";
import ApplicationReducer from "./Application/reducer";
import ButtonWidgetReducer from "./ButtonWidget/reducer";
import InstagramWidgetReducer from "./InstagramWidget/reducer";
import ShopReducer from "./Shop/reducer";
import WidgetReducer from "./Widget/reducer";

const rootStateProvider = {
  AppReducer: ApplicationReducer,
  TiktokWidgetReducer: WidgetReducer,
  InstagramWidgetReducer: InstagramWidgetReducer,
  ButtonWidgetReducer: ButtonWidgetReducer,
  ShopReducer: ShopReducer,
};

const reducer = combineReducers(rootStateProvider);
export type RootReducer = ReturnType<typeof reducer>;
export default reducer;
