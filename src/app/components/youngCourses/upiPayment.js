"use client";

import { useState } from "react";
import { FaMobileAlt, FaMoneyCheckAlt, FaCheckCircle, FaTimesCircle, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function DigitalPaymentsModule({ onNext }) {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (option) => {
    setSelected(option);
    if (option === "upi") {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 3000);
  };

  return (
    <div className="space-y-12 md:space-y-16 max-w-4xl mx-auto px-4 py-8">
      {/* 📱 Hero Section */}
      <section className="text-center">
        <div className="flex justify-center mb-4">
          <FaMobileAlt className="text-5xl text-green-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-green-700">
          Digital Payments & UPI 101
        </h1>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Sending money has never been easier. Learn how UPI turned your phone into your wallet.
        </p>
      </section>

      {/* 💡 What is UPI */}
      <section className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
        <div className="flex items-center gap-3 text-green-700 mb-3">
          <FaMobileAlt className="text-xl" />
          <h2 className="text-xl font-semibold">What is UPI?</h2>
        </div>
        <p className="text-gray-700">
          UPI (Unified Payments Interface) connects your bank account to apps like PhonePe, Google Pay, Paytm.
          No wallet needed - just a tap to send payment.
        </p>
      </section>

      {/* 🔄 Real-time Magic */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-green-700 mb-3">How It Works</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Scan QR or enter UPI ID</li>
            <li>App connects to your bank instantly</li>
            <li>Direct bank-to-bank transfer</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-green-700 mb-3">Why It's Awesome</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>24/7 availability</li>
            <li>No need for account details</li>
            <li>Instant and secure</li>
          </ul>
        </div>
      </section>

      {/* 😂 Everyday Scenarios */}
      <section className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
        <div className="flex items-center gap-3 text-yellow-700 mb-3">
          <FaMoneyCheckAlt className="text-xl" />
          <h2 className="text-xl font-semibold">Everyday UPI Moments</h2>
        </div>
        <div className="space-y-4 text-gray-700">
          <div className="flex items-start gap-2">
            <span>🛵</span>
            <p>Zomato delivery? Pay by UPI before your mom says "give cash"</p>
          </div>
          <div className="flex items-start gap-2">
            <span>👯‍♀️</span>
            <p>Friend paid for pizza? Split the bill instantly with UPI</p>
          </div>
          <div className="flex items-start gap-2">
            <span>🧾</span>
            <p>Forgot wallet? Just say "I'll UPI you" and continue</p>
          </div>
        </div>
      </section>

      {/* 🧠 Quiz Time */}
      <section className="bg-green-50 p-6 rounded-xl border-l-4 border-green-600">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Quick Quiz</h3>
        <p className="text-gray-700 mb-6">
          Which payment method allows instant bank transfers using just a phone number or UPI ID?
        </p>
        
        <div className="space-y-3">
          <button
            className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
              selected === "neft" ? (isCorrect ? "" : "bg-red-50 border-red-300") : "hover:bg-gray-50"
            }`}
            onClick={() => handleAnswer("neft")}
          >
            🕒 NEFT (National Electronic Funds Transfer)
          </button>
          <button
            className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
              selected === "cheque" ? (isCorrect ? "" : "bg-red-50 border-red-300") : "hover:bg-gray-50"
            }`}
            onClick={() => handleAnswer("cheque")}
          >
            🧾 Cheque Deposit
          </button>
          <button
            className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
              selected === "upi" ? (isCorrect ? "bg-green-50 border-green-300" : "") : "hover:bg-gray-50"
            }`}
            onClick={() => handleAnswer("upi")}
          >
            ⚡ UPI (Unified Payments Interface)
          </button>
        </div>

        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
              isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {isCorrect ? (
              <FaCheckCircle className="text-green-600" />
            ) : (
              <FaTimesCircle className="text-red-600" />
            )}
            <span>
              {isCorrect
                ? "Correct! UPI is instant, safe, and smart!"
                : "Nope! UPI is the real game-changer here."}
            </span>
          </motion.div>
        )}
      </section>

      {/* ✅ Summary */}
      <section className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
        <h3 className="text-lg font-semibold text-green-700 mb-3">Key Takeaway</h3>
        <p className="text-gray-700">
          UPI made money transfers as easy as messaging - no queues, no slips, just instant payments.
          Time to say goodbye to "Do you have change?"
        </p>
      </section>

      {/* Next Button */}
    
    </div>
  );
}