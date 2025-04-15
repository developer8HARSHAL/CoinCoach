"use client"

import { FaFire, FaPiggyBank } from "react-icons/fa";

export default function InflationImpactModule({ onNext }) {
  return (
    <div className="space-y-20">

      {/* 🔥 Hero Section */}
      <section className="text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-red-600 drop-shadow-sm">
          🔥 Inflation: The Silent Wallet Killer
        </h1>
        <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Inflation slowly eats away your money’s power — like a sneaky thief in the night. Let's uncover how it works and why it matters to your savings.
        </p>
      </section>

      {/* 📉 Core Idea */}
      <section className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border-l-[6px] border-red-500">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <FaFire className="text-2xl" />
          <h2 className="text-3xl font-semibold">Why You Should Care</h2>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed">
          Suppose you keep ₹1000 in your piggy bank. One year later, prices rise due to <strong>inflation</strong> — and your ₹1000 now buys less than before.
          <br /><br />
          That means your money <span className="text-red-600 font-semibold">lost value</span> — just by sitting idle!
        </p>
      </section>

      {/* 📊 Visual Comparison */}
      <section className="grid md:grid-cols-2 items-center gap-10 bg-gradient-to-r from-red-100 to-yellow-50 p-8 md:p-10 rounded-3xl shadow-lg">
        <div>
          <h3 className="text-2xl font-semibold text-red-700 mb-3">💸 What ₹1000 Can Buy</h3>
          <ul className="text-base text-gray-800 list-disc pl-6 space-y-2">
            <li><strong>Today:</strong> A pair of jeans 👖</li>
            <li><strong>In 5 years (5% inflation):</strong> Only a T-shirt 👕</li>
            <li><strong>In 10 years:</strong> Maybe just a sandwich 🥪</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-red-300">
          <h4 className="text-red-600 font-semibold mb-2 text-lg">😬 Reality Check</h4>
          <p className="text-gray-700 leading-relaxed">
            Inflation at 6% yearly means your savings lose 6% purchasing power each year unless they’re invested wisely.
          </p>
        </div>
      </section>

      {/* 🐷 Funny Examples */}
      <section className="bg-white/90 p-8 rounded-3xl shadow-xl border-l-[6px] border-yellow-400">
        <div className="text-yellow-700 font-semibold text-2xl flex items-center gap-3 mb-4">
          <FaPiggyBank className="text-2xl" />
          Funny + Relatable Bits
        </div>
        <ul className="text-gray-800 space-y-5 text-lg leading-relaxed">
          <li>
            🧃 <strong>The Juice Story:</strong> In 2010, ₹10 got you a full glass. Now? A sip. In 2030? Just the straw. 🥤
          </li>
          <li>
            🧓 <strong>Dad's Tale:</strong> "Back then, ₹100 got groceries for a week!" Today? It gets 3 onions and a tomato.
          </li>
          <li>
            💳 <strong>Bank Balance Illusion:</strong> ₹50,000 saved ≠ ₹50,000 value in the future... unless you invest it smartly!
          </li>
        </ul>
      </section>

      {/* ✅ Summary */}
      <section className="bg-red-100 p-6 md:p-8 rounded-xl border-l-4 border-red-500 text-gray-800">
        <h4 className="text-red-700 font-semibold text-2xl mb-2">🧠 Smart Move</h4>
        <p className="text-lg leading-relaxed">
          Saving is good — but just saving isn’t enough. You need to protect your money from inflation by <strong>investing it wisely</strong>. Otherwise, you’re just watching it shrink over time.
        </p>
      </section>

      {/* 👉 Next Button */}
      <div className="flex justify-end mt-10">
        <button
          onClick={onNext}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition duration-300"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
