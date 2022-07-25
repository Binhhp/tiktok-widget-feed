import React from "react";
import ReactDOM from "react-dom/client";
// third party
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import GlobalStyle from "./GlobalStyle";
import workerTikTokManager from "stores/TikTok";
import TikTokApp from "./TikTokApp";

const elements = document.querySelectorAll("div[name='orichi']");

if (elements && elements.length > 0) {
  elements.forEach((element) => {
    const root = ReactDOM.createRoot(element);
    const widgetId = element.getAttribute("data-id");
    root.render(
      <Provider store={workerTikTokManager.store}>
        <BrowserRouter>
          <GlobalStyle />
          <TikTokApp widgetId={widgetId} />
        </BrowserRouter>
      </Provider>
    );
  });
}
