import { INavItemProps } from "./NavItem";
import {
  Chip,
  ListItemButton,
  ListItemButtonMenu,
  ListItemIcon,
  ListItemTagHref,
  ListItemWrapper,
} from "./NavItemStyle";
import React from "react";
import { Heading, Icon } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationActionTS } from "stores/Admin/Application/action";
import { RootReducer } from "stores/Admin/reducers";

function NavItem(props: INavItemProps) {
  const nameReducer = props.item?.chip && props.item?.chip.nameReducer;
  const TikTokWidgetReducer = useSelector(
    (state: RootReducer) => state.TiktokWidgetReducer
  );
  const InstagramWidgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );

  const RenderCount = () => {
    switch (nameReducer) {
      case "InstagramWidgetReducer":
        return InstagramWidgetReducer.count;
      case "TiktokWidgetReducer":
        return TikTokWidgetReducer.count;
      default:
        return 0;
    }
  };
  const item = () => {
    return (
      <>
        {
          <ListItemIcon>
            {props?.icon && <Icon source={props.icon} color="base" />}
          </ListItemIcon>
        }
        <Heading>{props.item?.title}</Heading>
        {props?.item?.chip && <Chip>{RenderCount()}</Chip>}
      </>
    );
  };

  const appReducer = useSelector((state: RootReducer) => state.AppReducer);
  const dispatch = useDispatch();
  const onHandleMenuItem =
    (key?: string, active: boolean = false) =>
    () => {
      key && dispatch(ApplicationActionTS.OnHandleMenuItem(key, active));
    };

  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);

  const activeMenu =
    appReducer.menuActive === props?.item?.id ||
    window.location.pathname.substring(1, window.location.pathname.length) ===
      props.item?.id ||
    (window.location.pathname === "/" ? props.active : false);
  return (
    <ListItemWrapper>
      {!props?.selected ? (
        props.item?.redirect ? (
          <ListItemTagHref
            href={`https://${shopReducer.shop.domain}`}
            level={props.level}
            target="_blank"
          >
            {item()}
          </ListItemTagHref>
        ) : (
          <ListItemButton
            className={activeMenu ? "active-menu" : ""}
            to={`${props.item?.url}?shop=${shopReducer.shop.domain}` ?? "#"}
            level={props.level}
            onClick={onHandleMenuItem(props.item?.id, true)}
          >
            {item()}
          </ListItemButton>
        )
      ) : (
        <ListItemButtonMenu
          onClick={onHandleMenuItem(props.item?.id)}
          level={props.level}
        >
          {item()}
        </ListItemButtonMenu>
      )}
    </ListItemWrapper>
  );
}

export default NavItem;
