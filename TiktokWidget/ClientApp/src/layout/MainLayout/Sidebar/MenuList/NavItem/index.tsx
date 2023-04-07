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
import { UriProvider } from "common/functions/FuncUtils";

function NavItem(props: INavItemProps) {
  const nameReducer = props.chip && props.chip.nameReducer;
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
        <Heading>{props.title}</Heading>
        {props?.chip && <Chip>{RenderCount()}</Chip>}
      </>
    );
  };

  const dispatch = useDispatch();
  const onHandleMenuItem =
    (key?: string, active: boolean = false) =>
    () => {
      key && dispatch(ApplicationActionTS.OnHandleMenuItem(key, active));
    };

  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);
  const appReducer = useSelector((state: RootReducer) => state.AppReducer);

  const activeMenu =
    props.level === 1
      ? window.location.pathname === props.url
      : window.location.pathname.includes(props.id) ||
        appReducer.menuActive.includes(props.id);

  return ((!InstagramWidgetReducer.count ||
    InstagramWidgetReducer.count === 0) &&
    props.id === "my-instagram-widget") ||
    (!TikTokWidgetReducer.count && props.id === "my-widget") ? (
    <></>
  ) : (
    <ListItemWrapper>
      {!props?.selected ? (
        props?.redirect ? (
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
            to={UriProvider.KeepParameters(props.url)}
            level={props.level}
            onClick={onHandleMenuItem(props.id, true)}
          >
            {item()}
          </ListItemButton>
        )
      ) : (
        <ListItemButtonMenu
          onClick={onHandleMenuItem(props.id)}
          level={props.level}
        >
          {item()}
        </ListItemButtonMenu>
      )}
    </ListItemWrapper>
  );
}

export default NavItem;
