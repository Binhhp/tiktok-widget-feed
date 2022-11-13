import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { ChildrenContent, MainContent, MainLayoutWrapper } from "./index.style";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { WidgetActionTS } from "stores/Admin/Widget/action";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
import { RootReducer } from "stores/Admin/reducers";
import { UriProvider } from "common/functions/FuncUtils";

const MainLayout: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const tiktokWidgetReducer = useSelector(
    (state: RootReducer) => state.TiktokWidgetReducer
  );
  const instagramWidgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );

  useEffect(() => {
    if (
      !window.location.pathname.includes("create-widget") &&
      tiktokWidgetReducer.settings.title
    ) {
      dispatch(WidgetActionTS.OnSetSetting(true));
    } else if (
      !window.location.pathname.includes("instagram-step") &&
      instagramWidgetReducer.settings.title
    ) {
      dispatch(InstagramWidgetActionTS.OnSetSetting(true));
    }
  }, [window.location.pathname]);

  return (
    <MainLayoutWrapper>
      <Header />
      <MainContent>
        <Sidebar />
        <ChildrenContent>
          <Outlet />
        </ChildrenContent>
      </MainContent>
    </MainLayoutWrapper>
  );
};
export default MainLayout;
