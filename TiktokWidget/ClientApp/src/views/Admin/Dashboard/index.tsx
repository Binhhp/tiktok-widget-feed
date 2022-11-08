import React from 'react';
import { DashboardWrapper } from './DashboardStyle';
import Banner from './components/Banner';
import MetricChart from './components/MetricChart';
import DateRange from 'ui-components/DateRange';
import MostPost from './components/MostPosts';
import RecentCourse from './components/RecentCourse';

function Dashboard() {
  return (
    <DashboardWrapper>
      <div className='left'>
        <Banner />
        <MetricChart />
      </div>
      <div className='right'>
        <DateRange />
        <MostPost />
        <RecentCourse />
      </div>
    </DashboardWrapper>
  );
}

export default Dashboard;
