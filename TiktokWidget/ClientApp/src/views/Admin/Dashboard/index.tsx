import React from "react";
import { DashboardContainer, DashboardWrapper } from "./DashboardStyle";
import Banner from "./components/Banner";
import MetricChart from "./components/MetricChart";
import MostPost from "./components/MostPosts";
import RecentCourse from "./components/RecentCourse";
import { RootReducer } from "stores/Admin/reducers";
import { useSelector } from "react-redux";
import DateRangePicker from "./DateRange";

function Dashboard() {
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);

  return (
    <DashboardWrapper>
      <div className="orichi-dashboard-header">
        <div className="orichi-dashboard-welcome">
          <h3>
            Welcome to{" "}
            {shopReducer.shop.shopDescriptor?.shopOwner ??
              shopReducer?.shop?.domain}
            !🎉
          </h3>
          <p className="orichi-text-welcome">
            You will be able to see top performers based on views and
            call-to-actions
          </p>
        </div>
        <DateRangePicker />
      </div>
      <DashboardContainer>
        <div className="orichi-dashboard-left">
          <Banner />
          <MetricChart />
        </div>
        <div className="orichi-dashboard-right">
          <MostPost />
          <RecentCourse />
        </div>
      </DashboardContainer>
    </DashboardWrapper>
  );
}

export default Dashboard;
