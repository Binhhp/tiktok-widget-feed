import { combineReducers } from "redux";
import ButtonWidgetReducer from "stores/Admin/ButtonWidget/reducer";
import ShopReducer from "stores/Admin/Shop/reducer";

const rootStateProvider = {
  buttonWidgetReducer: ButtonWidgetReducer,
  shopReducer: ShopReducer,
};

const tikTokReducer = combineReducers(rootStateProvider);
export type RootTikTokReducer = ReturnType<typeof tikTokReducer>;
export default tikTokReducer;
