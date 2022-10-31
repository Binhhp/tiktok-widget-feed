import React from 'react';
import { DashboardWrapper } from './DashboardStyle';
import IconDashboard from 'assets/images/dashboard.png';
import Banner from './components/Banner';

function Dashboard() {
  return (
    <DashboardWrapper>
      <div>
        <Banner />
      </div>
    </DashboardWrapper>
  );
}

export default Dashboard;
