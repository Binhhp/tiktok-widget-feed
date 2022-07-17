import menuItems from "menu-items";
import NavGroup from "./NavGroup";
import React from "react";
import { TextStyle } from "@shopify/polaris";
const MenuList = () => {
  const navItems = menuItems.items.map((item, index) => {
    switch (item.type) {
      case "group":
        return <NavGroup index={index} item={item} key={item.id}></NavGroup>;
      default:
        return <TextStyle variation="negative">Menu Items Error</TextStyle>;
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
