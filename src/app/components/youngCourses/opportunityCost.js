"use client"

import { FaExchangeAlt, FaBalanceScale } from "react-icons/fa";

export default function OpportunityCostModule({ onNext }) {
  return (
    <div className="space-y-20">

      {/* 🔁 Hero Section */}
      <section className="text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 drop-shadow-sm">
          🔁 Opportunity Cost: The Hidden Price Tag
        </h1>
        <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Every decision costs you something — even if it feels free. Let’s unpack the secret cost behind every choice you make.
        </p>
      </section>

      {/* ⚖️ Core Idea */}
      <section className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border-l-[6px] border-blue-600">
        <div className="flex items-center gap-3 text-blue-700 mb-4">
          <FaBalanceScale className="text-2xl" />
          <h2 className="text-3xl font-semibold">Trade-offs Are Everywhere</h2>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed">
          Opportunity cost is the value of the thing you didn’t choose. It’s what you gave up when picking one option over another.
          <br /><br />
          Spend ₹500 on pizza today? That’s ₹500 less growing in your future investments 🍕→📉.
        </p>
      </section>

      {/* 🔍 Visual Comparison */}
      <section className="grid md:grid-cols-2 items-center gap-10 bg-gradient-to-r from-blue-100 to-sky-50 p-8 md:p-10 rounded-3xl shadow-lg">
        <div>
          <h3 className="text-2xl font-semibold text-blue-700 mb-3">🔍 Choices You Didn't Realize You Made</h3>
          <ul className="text-base text-gray-800 list-disc pl-6 space-y-2">
            <li><strong>Choosing Netflix over reading?</strong> Lost a new skill. 🎥📘</li>
            <li><strong>Buying fast fashion?</strong> Lost future savings. 🛍️💸</li>
            <li><strong>Not investing early?</strong> Lost compounding gains. ⏳📈</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-300">
          <h4 className="text-blue-600 font-semibold mb-2 text-lg">💡 Think Before You Choose</h4>
          <p className="text-gray-700 leading-relaxed">
            Every “yes” today might secretly mean a “no” to a better tomorrow. Spend wisely, choose consciously.
          </p>
        </div>
      </section>

      {/* 😂 Funny + Relatable Bits */}
      <section className="bg-white/90 p-8 rounded-3xl shadow-xl border-l-[6px] border-yellow-400">
        <div className="text-yellow-700 font-semibold text-2xl flex items-center gap-3 mb-4">
          <FaExchangeAlt className="text-2xl" />
          Funny + Relatable Bits
        </div>
        <ul className="text-gray-800 space-y-5 text-lg leading-relaxed">
          <li>
            🎮 <strong>The Game Trade:</strong> Bought a skin for ₹1000? That could’ve been ₹1200 by now. Now your skin’s old *and* broke.
          </li>
          <li>
            🍟 <strong>Fast Food FOMO:</strong> Those ₹500 fries? Could’ve been half a mutual fund unit.
          </li>
          <li>
            💤 <strong>Sleep vs Side Hustle:</strong> Netflix + chill today = No freelance bill tomorrow.
          </li>
        </ul>
      </section>

      {/* ✅ Summary */}
      <section className="bg-blue-100 p-6 md:p-8 rounded-xl border-l-4 border-blue-600 text-gray-800">
        <h4 className="text-blue-700 font-semibold text-2xl mb-2">🧠 Smart Thinking</h4>
        <p className="text-lg leading-relaxed">
          Start noticing the invisible price tag behind your decisions. Whether it’s money or time, what you’re giving up is just as important as what you’re choosing.
        </p>
      </section>

      {/* 👉 Next Button */}
      <div className="flex justify-end mt-10">
        <button
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition duration-300"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
