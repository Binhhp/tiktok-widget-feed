import { Outlet } from "react-router-dom";
import React from "react";
import { ChildrenContent, MainContent, MainLayoutWrapper } from "./index.style";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout: React.FC = (): JSX.Element => {
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
