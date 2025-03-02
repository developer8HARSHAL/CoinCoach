'use client';

import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import { UserDataProvider } from '../components/Dashboard/UserDataProvider';

export default function DashboardPage() {
  return (
    <UserDataProvider> 
      <Dashboard />
    </UserDataProvider>
  );
}