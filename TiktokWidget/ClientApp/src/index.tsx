// import React, { lazy } from "react";
// import ReactDOM from "react-dom/client";
// // third party
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import workerManager from "stores/Admin";
// import GlobalStyles from "GlobalStyles";
// import Loadable from "ui-components/Loading/Loadable";
// import { ErrorBoundary } from "react-error-boundary";
// import ErrorFallback from "views/ErrorFallback";
// import { Helmet } from "react-helmet";
// import { SWRConfig } from "swr";
// import fetcher from "utils/fetcher";

// const App = Loadable(lazy(() => import("./App")));
// const root = ReactDOM.createRoot(
//   document.getElementById("orichi-root") as HTMLElement
// );
// root.render(
//   <SWRConfig value={{ fetcher, errorRetryCount: 3 }}>
//     <Provider store={workerManager.store}>
//       <Helmet>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <meta name="theme-color" content="#000000" />
//         <meta
//           http-equiv="Content-Security-Policy"
//           content="upgrade-insecure-requests"
//         />
//         <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1"
//         ></meta>
//         <meta name="description" content="TikTok Feed and Instagram Feed" />
//         <title>Orichi Widget Feed</title>
//         <script type="text/javascript">
//           {`(function (l) {
//           if (l.search[1] === "/") {
//             var decoded = l.search
//               .slice(1)
//               .split("&")
//               .map(function (s) {
//                 return s.replace(/~and~/g, "&");
//               })
//               .join("?");
//             window.history.replaceState(
//               null,
//               null,
//               l.pathname.slice(0, -1) + decoded + l.hash
//             );
//           }
//         })(window.location);`}
//         </script>
//         <script
//           src="https://unpkg.com/react/umd/react.production.min.js"
//           crossOrigin="anonymous"
//           async
//         ></script>
//         <script
//           src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
//           crossOrigin="anonymous"
//           async
//         ></script>
//       </Helmet>
//       <GlobalStyles />
//       <ErrorBoundary FallbackComponent={ErrorFallback}>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </ErrorBoundary>
//     </Provider>
//   </SWRConfig>
// );

// String.prototype.format = function () {
//   var args = arguments;
//   return this.replace(/{([0-9]+)}/g, function (match, index) {
//     return typeof args[index] == "undefined" ? match : args[index];
//   });
// };

import React from "react";
import ReactDOM from "react-dom/client";
// third party
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import widgetReducerManager from "stores/Layout/Widget";
import { StyleSheetManager } from "styled-components";
import GlobalStyle from "views/Layout/Common/GlobalStyle";
import TikTokApp from "views/Layout/TikTok/TikTokApp";

//Show tiktok widget
const elements = document.querySelectorAll("div[name='orichi']");
if (elements && elements.length > 0) {
  elements.forEach((element) => {
    const root = ReactDOM.createRoot(element);
    const widgetId = element.getAttribute("data-id");
    root.render(
      <StyleSheetManager disableVendorPrefixes>
        <Provider store={widgetReducerManager.store}>
          <BrowserRouter>
            <GlobalStyle />
            <TikTokApp widgetId={widgetId} />
          </BrowserRouter>
        </Provider>
      </StyleSheetManager>
    );
  });
}
