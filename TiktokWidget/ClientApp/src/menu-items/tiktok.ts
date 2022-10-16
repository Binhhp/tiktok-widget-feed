import { MobileHamburgerMajor } from "@shopify/polaris-icons";
import { IMenuItems, MenuItemType } from "./MenuModel";
const widget: IMenuItems = {
  id: "widget",
  title: "Widget",
  type: MenuItemType.Group,
  icon: MobileHamburgerMajor,
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

export default widget;
