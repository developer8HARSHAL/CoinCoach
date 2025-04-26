'use client';
import Homepage from "./components/Homepage";
import CoinCoachLearning from "./components/CoinCoachLearning";
<<<<<<< HEAD
import InvestmentBasics from "./components/adultcourses/investment/investmentbasics";
=======
import InvestmentBasics from "./components/Above18/investment/investmentbasics";
>>>>>>> HEAD@{1}
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
