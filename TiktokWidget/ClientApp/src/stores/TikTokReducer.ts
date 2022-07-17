import { combineReducers } from "redux";
import ButtonWidgetReducer from "./ButtonWidget/reducer";
import ShopReducer from "./Shop/reducer";
import TemplateStoreReducer from "./Templates/reducer";

const rootStateProvider = {
  buttonWidgetReducer: ButtonWidgetReducer,
  templateStoreReducer: TemplateStoreReducer,
  shopReducer: ShopReducer,
};

const tikTokReducer = combineReducers(rootStateProvider);
export type RootTikTokReducer = ReturnType<typeof tikTokReducer>;
export default tikTokReducer;
