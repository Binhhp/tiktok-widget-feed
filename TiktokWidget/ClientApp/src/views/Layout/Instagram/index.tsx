import React from "react";
import ReactDOM from "react-dom/client";
// third party
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import widgetReducerManager from "stores/Layout/Widget";
import { StyleSheetManager } from "styled-components";
import Instagram from "./InstagramApp";
import GlobalCssLayout from "../Common/GlobalCssLayout";

//Show instagram widget
const elementInstagram = document.querySelectorAll(
  "div[name='orichi-instagram']"
);
if (elementInstagram && elementInstagram.length > 0) {
  elementInstagram.forEach((element) => {
    const rootInstagram = ReactDOM.createRoot(element);
    const widgetIdInstagram = element.getAttribute("data-id");
    rootInstagram.render(
      <StyleSheetManager disableVendorPrefixes>
        <Provider store={widgetReducerManager.store}>
          <BrowserRouter>
            <GlobalCssLayout />
            <Instagram widgetId={widgetIdInstagram} />
          </BrowserRouter>
        </Provider>
      </StyleSheetManager>
    );
  });
}
