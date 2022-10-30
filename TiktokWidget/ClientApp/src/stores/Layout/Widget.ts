import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import tikTokReducer from "./WidgetReducer";

const middleware = [thunk];

const store = createStore(
  tikTokReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const widgetReducerManager = { store, middleware };
export default widgetReducerManager;
