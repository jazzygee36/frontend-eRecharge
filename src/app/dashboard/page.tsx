'use client';
import React from 'react';
import Dashboard from '../../component/common/dashboardContainer/dashboard';
import withAuth from '../hoc';

const DashboardContainer = () => {
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default withAuth(DashboardContainer);
