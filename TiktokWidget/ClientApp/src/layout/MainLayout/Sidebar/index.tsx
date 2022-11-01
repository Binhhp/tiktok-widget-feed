import { SidebarWrapper, SupportLink } from "./SidebarStyle";
import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import PerfectScrollbar from "react-perfect-scrollbar";
import MenuList from "./MenuList";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import { ChatMajor } from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";
import { ChatPlugin } from "common/functions/ChatPlugin";
import FeedBack from "./FeedBack";
import { FeedbackStatus } from "repositories/dtos/responses/BaseShop";

function Sidebar() {
  const appReducer = useSelector((state: RootReducer) => state.AppReducer);
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);
  return (
    <SidebarWrapper active={appReducer.mobileMenuView}>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: "calc(100% - 60px)",
          }}
        >
          <MenuList></MenuList>
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <MenuList></MenuList>
      </MobileView>

      <SupportLink>
        {shopReducer?.shop?.shopDescriptor?.feedbackStatus === null && (
          <FeedBack domain={shopReducer.shop.domain} />
        )}
        <div onClick={ChatPlugin.Open} className="orichi-tiktok-chat-plugin">
          <Icon source={ChatMajor} color="base" />
          <span>Live Chat Support</span>
        </div>
      </SupportLink>
    </SidebarWrapper>
  );
}

export default Sidebar;
