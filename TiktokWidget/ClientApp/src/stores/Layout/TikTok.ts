import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import tikTokReducer from "./TikTokReducer";

const middleware = [thunk];

const store = createStore(
  tikTokReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const workerTikTokManager = { store, middleware };
export default workerTikTokManager;
