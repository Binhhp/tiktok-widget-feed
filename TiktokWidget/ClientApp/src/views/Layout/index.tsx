import React from "react";
import ReactDOM from "react-dom/client";
// third party
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import GlobalStyle from "./GlobalStyle";
import workerTikTokManager from "stores/Layout/TikTok";
import { StyleSheetManager } from "styled-components";
import Instagram from "./Instagram";
import TikTokApp from "./TikTok/TikTokApp";

const elements = document.querySelectorAll("div[name='orichi']");

const elementInstagram = document.querySelectorAll(
  "div[name='orichi-instagram']"
);

if (elements && elements.length > 0) {
  elements.forEach((element) => {
    const root = ReactDOM.createRoot(element);
    const widgetId = element.getAttribute("data-id");
    root.render(
      <StyleSheetManager disableVendorPrefixes>
        <Provider store={workerTikTokManager.store}>
          <BrowserRouter>
            <GlobalStyle />
            <TikTokApp widgetId={widgetId} />
          </BrowserRouter>
        </Provider>
      </StyleSheetManager>
    );
  });
}

if (elementInstagram && elementInstagram.length > 0) {
  elementInstagram.forEach((element) => {
    const rootInstagram = ReactDOM.createRoot(element);
    const widgetIdInstagram = element.getAttribute("data-id");
    rootInstagram.render(
      <StyleSheetManager disableVendorPrefixes>
        <Provider store={workerTikTokManager.store}>
          <BrowserRouter>
            <GlobalStyle />
            <Instagram widgetId={widgetIdInstagram} />
          </BrowserRouter>
        </Provider>
      </StyleSheetManager>
    );
  });
}
