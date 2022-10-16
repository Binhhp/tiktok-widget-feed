import { ProductsMajor } from "@shopify/polaris-icons";
import { IMenuItems, MenuItemType } from "./MenuModel";
const instagram: IMenuItems = {
  id: "instagram",
  title: "Instagram Widget",
  type: MenuItemType.Group,
  icon: ProductsMajor,
  children: [
    {
      id: "instagram-step-1",
      title: "Create widget",
      type: MenuItemType.Item,
      url: "/instagram-step-1",
    },
    {
      id: "my-instagram-widget",
      title: "My widget",
      type: MenuItemType.Item,
      url: "/my-instagram-widget",
      chip: {
        nameReducer: "InstagramWidgetReducer",
      },
    },
  ],
};

export default instagram;
