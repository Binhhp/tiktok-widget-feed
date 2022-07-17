import en from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";

function withAppProvider(Component) {
  return function () {
    return (
      <AppProvider features={{ newDesignLanguage: true }} i18n={en}>
        <Component></Component>
      </AppProvider>
    );
  };
}

(function (l) {
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
})(window.location);

export default withAppProvider;
