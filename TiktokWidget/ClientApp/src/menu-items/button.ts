import { BuyButtonMajor } from "@shopify/polaris-icons";
import { IMenuItems, MenuItemType } from "./MenuModel";
const buttonWidget: IMenuItems = {
  id: "button-widget",
  title: "Button widget",
  type: MenuItemType.Item,
  url: "/button-widget",
  icon: BuyButtonMajor,
};

export default buttonWidget;
