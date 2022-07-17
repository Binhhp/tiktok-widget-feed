import { RootURL } from "common/constants/RootURL";

const config = {
  basename: "",
  defaultPath: "dashboard",
  apiUrl: "http://localhost",
  script: `<script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossorigin></script><script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script><script src="${RootURL.ApiBase}/tiktok.js"></script>`,
  helperUrl: "http://localhost/",
  videoUrl:
    "https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850",
  youtubeUrl: "https://www.youtube.com/embed/sEusMMkl1vM",
  learnMoreUrl: "https://youtube.com",
  scriptJwPlayer: "https://content.jwplatform.com/libraries/jvJ1Gu3c.js",
  linkButtonWidget: "http://localhost",
};

export default config;
