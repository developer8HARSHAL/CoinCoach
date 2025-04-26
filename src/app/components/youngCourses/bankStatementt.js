"use client"

import { FaFileInvoiceDollar, FaWallet } from "react-icons/fa";

export default function BankStatementModule({ onNext }) {
  return (
    <div className="space-y-20">

      {/* 📄 Hero Section */}
      <section className="text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 drop-shadow-sm">
          📄 Understanding Bank Statements
        </h1>
        <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Bank statements are your money's diary 📘. Let’s learn to read them without falling asleep.
        </p>
      </section>

      {/* 📊 Statement Parts */}
      <section className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border-l-[6px] border-blue-600">
        <div className="flex items-center gap-3 text-blue-700 mb-4">
          <FaFileInvoiceDollar className="text-2xl" />
          <h2 className="text-3xl font-semibold">What’s Inside a Statement?</h2>
        </div>
        <ul className="text-gray-700 text-lg leading-relaxed space-y-3 list-disc pl-6">
          <li><strong>Opening & Closing Balance:</strong> Like a scoreboard of your cash.</li>
          <li><strong>Credits:</strong> Incoming money — salary, interest, refunds.</li>
          <li><strong>Debits:</strong> Money spent — food, bills, shopping.</li>
          <li><strong>Bank Charges:</strong> Small sneaky fees that add up!</li>
        </ul>
      </section>

      {/* 🔍 Spot the Spend! */}
      <section className="bg-gradient-to-r from-blue-100 to-sky-50 p-8 md:p-10 rounded-3xl shadow-lg">
        <h3 className="text-2xl font-semibold text-blue-700 mb-3">🔍 Let’s Spot the Spending</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-red-100 p-4 rounded-xl shadow hover:scale-105 transition duration-300 cursor-pointer">
            🍕 Pizza Palace - ₹600
            <p className="text-red-600">Weekly splurge?</p>
          </div>
          <div className="bg-green-100 p-4 rounded-xl shadow hover:scale-105 transition duration-300 cursor-pointer">
            🏦 Salary Credit + ₹30,000
            <p className="text-green-600">Steady income</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl shadow hover:scale-105 transition duration-300 cursor-pointer">
            📱 SMS Alerts - ₹15
            <p className="text-yellow-600">Hidden cost</p>
          </div>
        </div>
      </section>

      {/* 😂 Funny Examples */}
      <section className="bg-white/90 p-8 rounded-3xl shadow-xl border-l-[6px] border-yellow-400">
        <div className="text-yellow-700 font-semibold text-2xl flex items-center gap-3 mb-4">
          <FaWallet className="text-2xl" />
          Funny + Relatable Bits
        </div>
        <ul className="text-gray-800 space-y-5 text-lg leading-relaxed">
          <li>
            🛍️ <strong>Impulse Alert:</strong> Bought a ₹1000 t-shirt you wore once? Your bank statement remembers.
          </li>
          <li>
            ☕ <strong>Latte Life:</strong> Daily ₹200 coffee? That's ₹6000/month — sip smart!
          </li>
          <li>
            🎧 <strong>Sub Stack:</strong> Forgot to cancel Spotify, Prime, AND Gym? Say hello to sneaky drains.
          </li>
        </ul>
      </section>

      {/* ✅ Summary Tips */}
      <section className="bg-blue-100 p-6 md:p-8 rounded-xl border-l-4 border-blue-600 text-gray-800">
        <h4 className="text-blue-700 font-semibold text-2xl mb-2">🧠 Money Sense</h4>
        <p className="text-lg leading-relaxed">
          Bank statements are more than paper — they’re your habits in print. Review them monthly, track your leaks, and start saving like a boss.
        </p>
      </section>

      {/* 👉 Next Button */}
    
    </div>
  );
}
