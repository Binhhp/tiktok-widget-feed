import React from "react";
import { DashboardContent, DashboardWrapper } from "./DashboardStyle";
import IconDashboard from "assets/images/dashboard.png";
function Dashboard() {
  return (
    <DashboardWrapper>
      <DashboardContent>
        <img src={IconDashboard} alt="Dashboard TikTok Widget Feed" />
      </DashboardContent>
    </DashboardWrapper>
  );
}

export default Dashboard;
