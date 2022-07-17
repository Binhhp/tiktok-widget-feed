import React from "react";
import ReactDOM from "react-dom/client";
// third party
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import GlobalStyle from "./GlobalStyle";
import workerTikTokManager from "stores/TikTok";
import TikTokApp from "./TikTokApp";

const root = ReactDOM.createRoot(
  document.getElementById("orichi-root") as HTMLElement
);

root.render(
  <Provider store={workerTikTokManager.store}>
    <BrowserRouter>
      <GlobalStyle />
      <TikTokApp />
    </BrowserRouter>
  </Provider>
);
