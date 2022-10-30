import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
// third party
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import workerManager from "stores/Admin";
import GlobalStyles from "GlobalStyles";
import Loadable from "ui-components/Loading/Loadable";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "views/ErrorFallback";
import { Helmet } from "react-helmet";

const App = Loadable(lazy(() => import("./App")));
const root = ReactDOM.createRoot(
  document.getElementById("orichi-root") as HTMLElement
);
root.render(
  <Provider store={workerManager.store}>
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        http-equiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <meta name="description" content="TikTok Feed and Instagram Feed" />
      <title>Orichi Widget Feed</title>
      <script type="text/javascript">
        {`(function (l) {
          if (l.search[1] === "/") {
            var decoded = l.search
              .slice(1)
              .split("&")
              .map(function (s) {
                return s.replace(/~and~/g, "&");
              })
              .join("?");
            window.history.replaceState(
              null,
              null,
              l.pathname.slice(0, -1) + decoded + l.hash
            );
          }
        })(window.location);`}
      </script>
      <script
        src="https://unpkg.com/react/umd/react.production.min.js"
        crossOrigin="anonymous"
        async
      ></script>
      <script
        src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
        crossOrigin="anonymous"
        async
      ></script>
    </Helmet>
    <GlobalStyles />
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
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
// import widgetReducerManager from "stores/Layout/Widget";
// import { StyleSheetManager } from "styled-components";
// import GlobalStyle from "views/Layout/Common/GlobalStyle";
// import Instagram from "views/Layout/Instagram/InstagramApp";

// (function () {
//   //Add css swiper and fancybox
//   [
//     "https://cdnjs.cloudflare.com/ajax/libs/Swiper/6.8.0/swiper-bundle.min.css",
//     "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.css",
//   ].forEach((item: string) => {
//     var styleEl = document.createElement("link");
//     styleEl.rel = "stylesheet";
//     styleEl.href = item;
//     styleEl.crossOrigin = "anonymous";
//     styleEl.referrerPolicy = "no-referrer";
//     document.getElementsByTagName("head")[0].appendChild(styleEl);
//   });

//   //Show instagram widget
//   const elementInstagram = document.querySelectorAll(
//     "div[name='orichi-instagram']"
//   );
//   if (elementInstagram && elementInstagram.length > 0) {
//     elementInstagram.forEach((element) => {
//       const rootInstagram = ReactDOM.createRoot(element);
//       const widgetIdInstagram = element.getAttribute("data-id");
//       rootInstagram.render(
//         <StyleSheetManager disableVendorPrefixes>
//           <Provider store={widgetReducerManager.store}>
//             <BrowserRouter>
//               <GlobalStyle />
//               <Instagram widgetId={widgetIdInstagram} />
//             </BrowserRouter>
//           </Provider>
//         </StyleSheetManager>
//       );
//     });
//   }
// })();
