import { RootURL } from "common/constants/RootURL";

const config = {
  basename: "",
  defaultPath: "/",
  apiUrl: "http://localhost",
  script: `<script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossorigin></script><script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script><script src="${RootURL.ApiBase}/tiktok.js"></script>`,
  helperUrl: "http://localhost/",
  videoUrl:
    "https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850",
  youtubeUrl: "https://www.youtube.com/watch?v=j74EmTuj3P8",
  learnMoreUrl: "https://www.youtube.com/watch?v=j74EmTuj3P8",
  linkButtonWidget:
    "https://orichi.info/2022/02/07/tikify-tiktok-buttons-installation-onboarding",
  showItems: 15,
  sliderShowItem: 100,
  showUseSection: false,
  urlInstallTikTok:
    "https://apps.shopify.com/tikify-tiktok-button#modal-show=ReviewListingModal",
  CORS_PROXY: "https://shopifycdn.orichi.info/api/proxy?url=",
  FONT: {
    SFProDispayFont: `https://tiktok.orichi.info/SFProDisplay-Regular.ttf`,
    SFProTextFont: `https://tiktok.orichi.info/SFProText-Regular.ttf`,
  },
  Guides: "https://www.youtube.com/watch?v=4O6IFLHU8F0",
  SCRIPTS: {
    INSTAGRAM: `${window.location.origin}/instagram.js`,
    TIKTOK: `${window.location.origin}/tiktok.js`,
  },
  ONBOARDING: {
    LinkHelperTiktok:
      "https://orichi.info/2022/09/17/how-to-find-the-tiktok-pixel-id-2022/",
    LinkHelperInstagram:
      "https://orichi.info/2023/04/04/how-to-find-your-instagram-username/",
    VideoTiktok:
      "https://www.youtube.com/watch?v=-b3aYmI7PyA&t=3s&ab_channel=Alex",
    VideoInstagram:
      "https://www.youtube.com/watch?v=j74EmTuj3P8&ab_channel=Alex",
    ImgVideoTiktok: "https://img.youtube.com/vi/4O6IFLHU8F0/hqdefault.jpg",
    ImgVideoInstagram: "https://img.youtube.com/vi/j74EmTuj3P8/hqdefault.jpg",
    LinkTestApp: "https://www.youtube.com/watch?v=4O6IFLHU8F0",
  },
};

export default config;
