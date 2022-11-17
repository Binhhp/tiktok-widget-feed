import { RootURL } from "common/constants/RootURL";

const config = {
  basename: "",
  defaultPath: "/",
  apiUrl: "http://localhost",
  script: `<script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossorigin></script><script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script><script src="${RootURL.ApiBase}/tiktok.js"></script>`,
  helperUrl: "http://localhost/",
  videoUrl:
    "https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850",
  youtubeUrl: "https://www.youtube.com/embed/-b3aYmI7PyA",
  learnMoreUrl: "https://www.youtube.com/watch?v=-b3aYmI7PyA",
  linkButtonWidget:
    "https://orichi.info/2022/02/07/tikify-tiktok-buttons-installation-onboarding",
  showItems: 15,
  sliderShowItem: 100,
  showUseSection: false,
  urlInstallTikTok:
    "https://apps.shopify.com/tikify-tiktok-button#modal-show=ReviewListingModal",
  CORS_PROXY: "https://api.codetabs.com/v1/proxy?quest=",
};

export default config;
