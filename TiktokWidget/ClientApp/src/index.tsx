import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
// third party
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import workerManager from "stores";
import GlobalStyles from "GlobalStyles";
import Loadable from "ui-components/Loadable";

const App = Loadable(lazy(() => import("./App")));
const root = ReactDOM.createRoot(
  document.getElementById("orichi-root") as HTMLElement
);
root.render(
  <Provider store={workerManager.store}>
    <GlobalStyles />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

String.prototype.format = function () {
  var args = arguments;
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] == "undefined" ? match : args[index];
  });
};

// import React from "react";
// import ReactDOM from "react-dom/client";
// // third party
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import GlobalStyle from "../src/views/Layout/GlobalStyle";
// import workerTikTokManager from "stores/TikTok";
// import TikTokApp from "../src/views/Layout/TikTokApp";

// const elements = document.querySelectorAll("div[name='orichi']");

// if (elements && elements.length > 0) {
//   elements.forEach((element) => {
//     const root = ReactDOM.createRoot(element);
//     const widgetId = element.getAttribute("data-id");
//     root.render(
//       <Provider store={workerTikTokManager.store}>
//         <BrowserRouter>
//           <GlobalStyle />
//           <TikTokApp widgetId={widgetId} />
//         </BrowserRouter>
//       </Provider>
//     );
//   });
// }
