import { StoreMajor } from "@shopify/polaris-icons";
import { IMenuItems, MenuItemType } from "./MenuModel";

const apps: IMenuItems = {
  id: "apps",
  type: MenuItemType.Item,
  title: "Apps",
  label: "Integrations",
  icon: StoreMajor,
  url: "/apps",
};

export default apps;
