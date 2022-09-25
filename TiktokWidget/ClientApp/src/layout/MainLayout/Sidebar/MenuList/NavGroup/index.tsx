import { TextStyle } from "@shopify/polaris";
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
function NavGroup({ item, index }: any) {
  const appReducer = useSelector((state: RootReducer) => state.appReducer);
  const items = item?.children?.map((menu: any) => {
    switch (menu.type) {
      case "item":
        return (
          <NavItem
            icon={menu.icon}
            key={menu.id}
            disabled={menu?.disabled}
            level={2}
            item={menu}
          ></NavItem>
        );
      default:
        return <TextStyle variation="negative">Menu Items Error</TextStyle>;
    }
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      item?.children?.length > 0 &&
      item?.children.filter((x: any) => appReducer?.menuActive.includes(x.id))
        .length > 0
    ) {
      dispatch(ApplicationActionTS.OnHandleMenuItem(item?.id));
    }
  }, []);

  return (
    <NavGroupWrapper>
      {item?.label && index > 0 && <NavGroupText>{item.label}</NavGroupText>}
      <NavItem
        selected={item?.children ? true : false}
        icon={item.icon}
        key={item.id}
        disabled={item?.disabled}
        level={1}
        item={item}
      ></NavItem>
      {item?.children &&
        appReducer.menuItems.filter((x) => x === item?.id).length > 0 && (
          <NavGroupMenuItem>{items}</NavGroupMenuItem>
        )}
    </NavGroupWrapper>
  );
}

export default NavGroup;
