'use client';
import ResultsComponent from "../components/Results";
import { UserDataProvider } from '../components/dashboard/UserDataProvider';

export default function ResultsPage() {
  return (
    <UserDataProvider>
      <ResultsComponent />
    </UserDataProvider>
  );
}
