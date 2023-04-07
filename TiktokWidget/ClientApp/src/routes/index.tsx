import { useRoutes } from "react-router-dom";
import config from "config";
import MainRoutes, { OnboardingRoute } from "./MainRoutes";
import { CreateTikTokRoutes, MyTikTokRoutes } from "./TikTokRoutes";
import { InstagramRoutes, MyInstagramRoutes } from "./InstagramRoutes";
import EndpointManager from "./OtherRoutes";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";

export default function ThemeRoutes() {
  const tiktokWidgetReducer = useSelector(
    (state: RootReducer) => state.TiktokWidgetReducer
  );
  const instagramWidgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );

  const isOnBoarding =
    !tiktokWidgetReducer.count && !instagramWidgetReducer.count;

  return useRoutes(
    [
      MainRoutes(),
      CreateTikTokRoutes(isOnBoarding),
      MyTikTokRoutes(isOnBoarding),
      InstagramRoutes(isOnBoarding),
      MyInstagramRoutes(instagramWidgetReducer.count),
      OnboardingRoute(isOnBoarding),
      EndpointManager.NotFoundRoutes,
      EndpointManager.NotFoundUrlRoutes,
    ],
    config.basename
  );
}
