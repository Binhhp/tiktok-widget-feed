import { MobileHamburgerMajor } from "@shopify/polaris-icons";
const widget = {
  id: "widget",
  title: "Widget",
  type: "group",
  icon: MobileHamburgerMajor,
  children: [
    {
      id: "create-widget",
      title: "Create widget",
      type: "item",
      url: "/create-widget",
    },
    {
      id: "my-widget",
      title: "My widget",
      type: "item",
      url: "/my-widget",
    },
  ],
};

export default widget;
