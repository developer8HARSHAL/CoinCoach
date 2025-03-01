'use client';

import React from 'react';
import Dashboard from './dashboard';
import { UserDataProvider } from './UserDataProvider';

export default function DashboardPage() {
  return (
    <UserDataProvider> 
      <Dashboard />
    </UserDataProvider>
  );
}
