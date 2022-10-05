import { ProductsMajor } from "@shopify/polaris-icons";
import { IMenuItems, MenuItemType } from "./MenuModel";
const instagram: IMenuItems = {
  id: "instagram",
  title: "Instagram Widget",
  type: MenuItemType.Group,
  icon: ProductsMajor,
  children: [
    {
      id: "create-instagram-widget",
      title: "Create widget",
      type: MenuItemType.Item,
      url: "/create-instagram-widget",
    },
    {
      id: "my-instagram-widget",
      title: "My widget",
      type: MenuItemType.Item,
      url: "/my-instagram-widget",
      chip: "count",
    },
  ],
};

export default instagram;
