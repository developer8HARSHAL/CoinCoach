'use client';
import Homepage from "./components/Homepage";
import CoinCoachLearning from "./components/CoinCoachLearning";


import InvestmentBasics from "./components/Above18/investment/investmentbasics";

import { AuthProvider } from "./components/auth/AuthContext";
import BudgetPlanner from "./components/budgetplanner";

export default function Home() {
  return (
    <AuthProvider>
      <Homepage/>
      {/* <CoinCoachLearning /> */}
      {/* <InvestmentBasics /> */}
    </AuthProvider>
  );
}
