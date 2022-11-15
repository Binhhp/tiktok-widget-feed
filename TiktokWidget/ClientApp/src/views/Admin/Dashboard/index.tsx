import React from "react";
import { DashboardContainer, DashboardWrapper } from "./DashboardStyle";
import Banner from "./components/Banner";
import MetricChart from "./components/MetricChart";
import DateRange from "ui-components/DateRange";
import MostPost from "./components/MostPosts";
import RecentCourse from "./components/RecentCourse";
import { RootReducer } from "stores/Admin/reducers";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationActionTS } from "stores/Admin/Application/action";
import { DateRangeType } from "stores/Admin/Application/state";

function Dashboard() {
  const dateRangeSate = useSelector(
    (state: RootReducer) => state.AppReducer.dateRange
  );
  const dispatch = useDispatch();

  const handleOnChangeDateRange = React.useCallback(
    (dateRange: DateRangeType) => {
      dispatch(ApplicationActionTS.OnHandleChangeDateRange(dateRange));
    },
    [dispatch]
  );
  console.log({ dateRangeSate });
  return (
    <DashboardWrapper>
      <DashboardContainer>
        <DateRange
          onChangeDateRange={handleOnChangeDateRange}
          valueDefault={dateRangeSate}
        />
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
