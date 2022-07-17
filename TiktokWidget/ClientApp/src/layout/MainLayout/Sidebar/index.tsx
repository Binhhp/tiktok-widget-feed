import { SidebarWrapper } from "./SidebarStyle";
import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import PerfectScrollbar from "react-perfect-scrollbar";
import MenuList from "./MenuList";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/reducers";

function Sidebar() {
  const appReducer = useSelector((state: RootReducer) => state.appReducer);
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
    </SidebarWrapper>
  );
}

export default Sidebar;
