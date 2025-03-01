
import Homepage from "./components/Homepage";
import CoinCoachLearning from "./components/CoinCoachLearning";
import InvestmentBasics from "./inverstment/investment-basics";
import CreditDebitCrossword from "./components/CreditDebitCrossword";
import InvestmentBasics from "./components/inverstment/investmentbasics";

export default function Home() {
  return (
    <div>
      {/* <CreditDebitCrossword/> */}
      <Homepage/>
      {/* <Homepage/> */}
      {/* <CoinCoachLearning/> */}
      <InvestmentBasics/>
    </div>
  );
}