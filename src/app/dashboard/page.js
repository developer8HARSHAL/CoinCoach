'use client';

import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import { UserDataProvider } from '../components/Dashboard/UserDataProvider';
import Dashboard from '../components/dashboard/dashboard';
import { UserDataProvider } from '../components/dashboard/UserDataProvider';

export default function DashboardPage() {
  return (
    <UserDataProvider> 
      <Dashboard />
    </UserDataProvider>
  );
}