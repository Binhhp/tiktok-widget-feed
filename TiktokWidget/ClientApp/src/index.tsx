import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import workerManager from 'stores/Admin';
import GlobalStyles from 'GlobalStyles';
import Loadable from 'ui-components/Loadable';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'views/ErrorFallback';
import { SWRConfig } from 'swr';
import fetcher from 'utils/fetcher';

const App = Loadable(lazy(() => import('./App')));
const root = ReactDOM.createRoot(
  document.getElementById('orichi-root') as HTMLElement,
);
root.render(
  <SWRConfig value={{ fetcher, errorRetryCount: 3 }}>
    <Provider store={workerManager.store}>
      <GlobalStyles />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </SWRConfig>,
);

String.prototype.format = function () {
  var args = arguments;
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] == 'undefined' ? match : args[index];
  });
};
