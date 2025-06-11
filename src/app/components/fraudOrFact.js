"use client";

import { useState } from "react";
import { CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";

const statements = [
  { text: "Banks ask for your PIN to verify you.", isFact: false },
  { text: "Always check the URL before entering card details.", isFact: true },
  { text: "You should click on links that offer rewards instantly.", isFact: false },
  { text: "RBI advises not to share OTP with anyone.", isFact: true },
  { text: "Investment doubles in 1 week is usually a legit offer.", isFact: false },
  { text: "Government portals have .gov.in in their URL.", isFact: true },
  { text: "Scratch card links on WhatsApp are always safe.", isFact: false },
  { text: "UPI PIN should not be shared even with bank staff.", isFact: true },
];

export default function FraudOrFact() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (answer) => {
    if (selected !== null) return;

    const correct = statements[index].isFact === answer;
    if (correct) setScore(score + 1);
    setSelected(answer);

    setTimeout(() => {
      if (index + 1 < statements.length) {
        setIndex(index + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  const current = statements[index];

  return (
    <div className="max-w-2xl mx-auto my-36 px-4">
      {finished ? (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
            🛡️ Scam Radar Result
          </h2>
          <p className="text-6xl font-bold text-purple-600">
            {score}/{statements.length}
          </p>
          <p className="text-lg text-gray-700">
            {score >= 7
              ? "Amazing! You’ve got strong scam-detecting instincts."
              : score >= 5
              ? "Good job! A little more caution and you'll be scam-proof."
              : "Oops! Let’s stay safer online next time."}
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            <RefreshCw className="w-4 h-4" /> Play Again
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-xl text-center space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold text-purple-800 mb-2">💳 Fraud or Fact?</h1>
            <p className="text-md text-gray-600 max-w-md mx-auto">
              Decide whether each statement is a <span className="text-green-700 font-medium">Fact</span> or <span className="text-red-600 font-medium">Fraud</span>.
            </p>
          </div>

          <div className="p-6 bg-gray-100 border border-gray-300 rounded-xl text-xl font-medium text-gray-800 shadow-inner transition duration-300">
            {current.text}
          </div>

          <div className="flex justify-center gap-6 flex-wrap">
            <button
              onClick={() => handleAnswer(true)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg border transition-all duration-200 text-base ${
                selected === true
                  ? "bg-green-100 border-green-500 text-green-700"
                  : "hover:bg-green-50 text-green-700 border-green-300"
              }`}
            >
              <CheckCircle className="w-5 h-5" /> Fact
            </button>

            <button
              onClick={() => handleAnswer(false)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg border transition-all duration-200 text-base ${
                selected === false
                  ? "bg-red-100 border-red-500 text-red-700"
                  : "hover:bg-red-50 text-red-700 border-red-300"
              }`}
            >
              <AlertTriangle className="w-5 h-5" /> Fraud
            </button>
          </div>

          <p className="text-sm text-gray-500">
            Question {index + 1} of {statements.length}
          </p>
        </div>
      )}
    </div>
  );
}
