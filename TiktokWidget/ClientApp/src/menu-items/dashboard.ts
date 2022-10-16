import { HomeMajor } from "@shopify/polaris-icons";
import { IMenuItems, MenuItemType } from "./MenuModel";

const dashboard: IMenuItems = {
  id: "dashboard",
  type: MenuItemType.Group,
  title: "Dashboard",
  url: "/",
  icon: HomeMajor,
  active: true,
};

export default dashboard;
