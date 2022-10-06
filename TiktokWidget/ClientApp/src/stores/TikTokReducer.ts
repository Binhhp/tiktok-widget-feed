import { combineReducers } from "redux";
import ButtonWidgetReducer from "./ButtonWidget/reducer";
import ShopReducer from "./Shop/reducer";

const rootStateProvider = {
  buttonWidgetReducer: ButtonWidgetReducer,
  shopReducer: ShopReducer,
};

const tikTokReducer = combineReducers(rootStateProvider);
export type RootTikTokReducer = ReturnType<typeof tikTokReducer>;
export default tikTokReducer;
