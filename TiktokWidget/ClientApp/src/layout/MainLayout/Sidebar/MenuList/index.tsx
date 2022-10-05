import NavGroup from "./NavGroup";
import React from "react";
import { TextStyle } from "@shopify/polaris";
import MenuManagement from "menu-items";
import { MenuItemType } from "menu-items/MenuModel";
const MenuList = () => {
  const menuManager = new MenuManagement();
  const navItems = menuManager.items.map((item, index) => {
    switch (item.type) {
      case MenuItemType.Group:
        return <NavGroup index={index} item={item} key={item.id}></NavGroup>;

      case MenuItemType.Item:
        return <NavGroup index={index} item={item} key={item.id}></NavGroup>;

      default:
        return <TextStyle variation="negative">Menu Items Error</TextStyle>;
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
