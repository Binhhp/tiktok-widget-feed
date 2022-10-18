import { MobileHamburgerMajor } from "@shopify/polaris-icons";
import { IMenuItems, MenuItemType } from "./MenuModel";
const tiktok: IMenuItems = {
  id: "widget",
  title: "TikTok Widget",
  type: MenuItemType.Group,
  icon: MobileHamburgerMajor,
  url: "widget",
  children: [
    {
      id: "create-widget",
      title: "Create widget",
      type: MenuItemType.Group,
      url: "/create-widget",
    },
    {
      id: "my-widget",
      title: "My widget",
      type: MenuItemType.Group,
      url: "/my-widget",
      chip: {
        nameReducer: "TiktokWidgetReducer",
      },
    },
  ],
};

export default tiktok;
