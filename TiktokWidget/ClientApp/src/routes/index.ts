import { useRoutes } from "react-router-dom";
import config from "config";
import MainRoutes from "./MainRoutes";
import TikTokRoutes from "./TikTokRoutes";
import InstagramRoutes from "./InstagramRoutes";
import EndpointManager from "./OtherRoutes";

export default function ThemeRoutes() {
  return useRoutes(
    [
      MainRoutes,
      TikTokRoutes,
      InstagramRoutes,
      EndpointManager.NotFoundRoutes,
      EndpointManager.NotFoundUrlRoutes,
    ],
    config.basename
  );
}
