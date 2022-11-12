import React from 'react';
import { DashboardContainer, DashboardWrapper } from './DashboardStyle';
import Banner from './components/Banner';
import MetricChart from './components/MetricChart';
import DateRange from 'ui-components/DateRange';
import MostPost from './components/MostPosts';
import RecentCourse from './components/RecentCourse';

function Dashboard() {
  return (
    <DashboardWrapper>
      <DashboardContainer>
        <DateRange />
        <div className='left'>
          <Banner />
          <MetricChart />
        </div>
        <div className='right'>
          <MostPost />
          <RecentCourse />
        </div>
      </DashboardContainer>
    </DashboardWrapper>
  );
}

export default Dashboard;
