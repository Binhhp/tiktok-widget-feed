import React from "react";
import { DashboardWrapper } from "./DashboardStyle";
import Banner from "./components/Banner";
import MetricChart from "./components/MetricChart";
import DateRange from "ui-components/DateRange";
import MostPost from "./components/MostPosts";

function Dashboard() {
  return (
    <DashboardWrapper>
      <div>
        <Banner />
        <MetricChart />
      </div>
      <div>
        <DateRange />
        <MostPost />
      </div>
    </DashboardWrapper>
  );
}

export default Dashboard;
