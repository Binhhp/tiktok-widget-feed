import { TextStyle } from "@shopify/polaris";
import {
  IMenuChildrents,
  IMenuItems,
  MenuItemType,
} from "menu-items/MenuModel";
import React from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import NavItem from "../NavItem";

import {
  NavGroupMenuItem,
  NavGroupText,
  NavGroupWrapper,
} from "./NavGroupStyle";

interface INavGroupProps {
  item: IMenuItems;
  index: number;
}

function NavGroup(props: INavGroupProps) {
  const appReducer = useSelector((state: RootReducer) => state.AppReducer);
  const items = props.item?.children?.map((menu: IMenuChildrents) => {
    switch (menu.type) {
      case MenuItemType.Item:
        return (
          <NavItem
            icon={menu.icon}
            id={menu.id}
            disabled={menu?.disabled}
            level={2}
            title={menu.title}
            chip={menu.chip}
            redirect={menu.redirect}
            url={menu.url}
          ></NavItem>
        );

      case MenuItemType.Group:
        return (
          <NavItem
            icon={menu.icon}
            id={menu.id}
            disabled={menu?.disabled}
            level={2}
            title={menu.title}
            chip={menu.chip}
            redirect={menu.redirect}
            url={menu.url}
          ></NavItem>
        );
      default:
        return <TextStyle variation="negative">Menu Items Error</TextStyle>;
    }
  });

  return (
    <NavGroupWrapper>
      {props.item?.label && props.index > 0 && (
        <NavGroupText>{props.item.label}</NavGroupText>
      )}
      <NavItem
        selected={props.item?.children ? true : false}
        icon={props.item.icon}
        id={props.item.id}
        title={props.item.title}
        url={props.item.url}
        level={1}
      ></NavItem>
      {props.item?.children &&
        (appReducer.menuItems.some((x) => x === props.item?.id) ||
          props.item.children.some((x) =>
            window.location.pathname.includes(x.id)
          )) && <NavGroupMenuItem>{items}</NavGroupMenuItem>}
    </NavGroupWrapper>
  );
}

export default NavGroup;
