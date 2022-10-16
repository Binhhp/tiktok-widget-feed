import { TextStyle } from "@shopify/polaris";
import { IMenuChildrens, IMenuItems, MenuItemType } from "menu-items/MenuModel";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationActionTS } from "stores/Admin/Application/action";
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
  const items = props.item?.children?.map((menu: IMenuChildrens) => {
    switch (menu.type) {
      case MenuItemType.Item:
        return (
          <NavItem
            icon={menu.icon}
            key={menu.id}
            disabled={menu?.disabled}
            level={2}
            item={menu}
            active={menu.active}
          ></NavItem>
        );

      case MenuItemType.Group:
        return (
          <NavItem
            icon={menu.icon}
            key={menu.id}
            disabled={menu?.disabled}
            level={2}
            item={menu}
            active={menu.active}
          ></NavItem>
        );
      default:
        return <TextStyle variation="negative">Menu Items Error</TextStyle>;
    }
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      props.item?.children &&
      props.item?.children?.length > 0 &&
      props.item?.children.filter((x: any) =>
        appReducer?.menuActive.includes(x.id)
      ).length > 0
    ) {
      dispatch(ApplicationActionTS.OnHandleMenuItem(props.item?.id));
    }
  }, []);

  return (
    <NavGroupWrapper>
      {props.item?.label && props.index > 0 && (
        <NavGroupText>{props.item.label}</NavGroupText>
      )}
      <NavItem
        selected={props.item?.children ? true : false}
        icon={props.item.icon}
        key={props.item.id}
        level={1}
        item={props.item}
        active={props.item.active}
      ></NavItem>
      {props.item?.children &&
        appReducer.menuItems.filter((x) => x === props.item?.id).length > 0 && (
          <NavGroupMenuItem>{items}</NavGroupMenuItem>
        )}
    </NavGroupWrapper>
  );
}

export default NavGroup;
