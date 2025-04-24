'use client';
import Homepage from "./components/Homepage";
import CoinCoachLearning from "./components/CoinCoachLearning";
import InvestmentBasics from "./components/adultcourses/investment/investmentbasics";
import { AuthProvider } from "./components/auth/AuthContext";

export default function Home() {
  return (
    <AuthProvider>
      <Homepage />
      {/* <CoinCoachLearning /> */}
      {/* <InvestmentBasics /> */}
    </AuthProvider>
  );
}
