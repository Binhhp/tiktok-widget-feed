import { useRoutes } from "react-router-dom";
import config from "config";
import MainRoutes from "./MainRoutes";
import OtherRoutes from "./OtherRoutes";

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, OtherRoutes], config.basename);
}
