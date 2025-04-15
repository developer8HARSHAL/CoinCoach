"use client"

import { FaChartLine, FaLightbulb } from "react-icons/fa";

export default function TimeValueOfMoneyFunModule() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-10">

        <div className="flex flex-col md:flex-row items-center gap-6">
         
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-purple-700 drop-shadow-sm">
              💸 Time Value of Money
            </h1>
            <p className="text-lg text-gray-600 mt-2 max-w-xl">
              Money isn’t just money — it’s time-powered magic 🪄 that grows when handled wisely.
            </p>
          </div>
        </div>

        {/* 💡 Concept Highlight */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-purple-500 relative">
          <div className="flex items-center gap-2 text-purple-700 mb-3">
            <FaLightbulb className="text-xl" />
            <h2 className="text-2xl font-semibold">The Core Idea</h2>
          </div>
          <p className="text-gray-700 text-base">
            ₹1000 today is worth more than ₹1000 tomorrow. Why? Because today’s money can be <strong>invested</strong> and earn interest. That’s the power of <span className="text-purple-600 font-semibold">compounding</span>.
          </p>
        </div>

        {/* 📈 Animated Formula */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-indigo-200 to-purple-100 p-6 rounded-2xl shadow-md">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2 text-indigo-800">📚 Formula</h2>
            <p className="text-gray-700 text-base">
              <strong>Future Value (FV)</strong> = PV × (1 + r)<sup>n</sup>
            </p>
            <ul className="text-sm text-gray-600 mt-2 list-disc pl-5">
              <li>PV = Present Value (now)</li>
              <li>r = Interest Rate (%)</li>
              <li>n = Number of Years</li>
            </ul>
          </div>
          <Player
            autoplay
            loop
            src="https://assets5.lottiefiles.com/packages/lf20_kp7zszcz.json"
            className="w-40 h-40"
          />
        </div>

        {/* 🎮 Real-life Scenarios */}
        <div className="bg-white/90 p-6 rounded-2xl shadow-md border-l-4 border-yellow-400">
          <div className="text-yellow-700 font-semibold text-lg flex items-center gap-2 mb-2">
            <FaChartLine className="text-xl" />
            Relatable & Funny Examples
          </div>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              🧁 <strong>The Cupcake Dilemma:</strong> Invest your cupcake money today, enjoy a cupcake + donut combo next year!
            </li>
            <li>
              🎮 <strong>Gamer Logic:</strong> Spend ₹2,000 on a game skin today... or invest and get a full PS6 bundle in the future? 🤔
            </li>
            <li>
              👵🏽 <strong>Grandma’s Gold:</strong> "In my day, ₹500 meant gold. Now? It’s barely 2 samosas." Inflation is real.
            </li>
          </ul>
        </div>

        {/* ✅ Summary */}
        <div className="bg-indigo-100 p-4 rounded-xl border-l-4 border-indigo-500 mt-6">
          <h4 className="text-indigo-800 font-semibold text-lg mb-1">✨ Key Takeaway</h4>
          <p className="text-gray-700">
            Every rupee you save today has the potential to grow into something bigger tomorrow. Use time as your ally — and your wallet will thank you later 💼💰.
          </p>
        </div>

      </div>
    </div>
  );
}
