// "use client";

// import { useState } from "react";
// import { FaMobileAlt, FaMoneyCheckAlt } from "react-icons/fa";
// import { toast } from "sonner"; // Ensure you have 'sonner' installed

// export default function DigitalPaymentsModule({ onNext }) {
//   const [selected, setSelected] = useState(null);

//   const handleAnswer = (option) => {
//     setSelected(option);
//     if (option === "upi") {
//       toast.success("✅ Correct! UPI is instant, safe, and smart!");
//     } else {
//       toast.error("❌ Nope! UPI is the real game-changer here.");
//     }
//   };

//   return (
//     <div className="space-y-20">
//       {/* 📱 Hero Section */}
//       <section className="text-center">
//         <h1 className="text-5xl md:text-6xl font-extrabold text-green-700 drop-shadow-sm">
//           📱 Digital Payments & UPI 101
//         </h1>
//         <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
//           Sending money has never been easier. Learn how UPI turned your phone into your wallet — and why cash is getting jealous.
//         </p>
//       </section>

//       {/* 💡 What is UPI */}
//       <section className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border-l-[6px] border-green-600">
//         <div className="flex items-center gap-3 text-green-700 mb-4">
//           <FaMobileAlt className="text-2xl" />
//           <h2 className="text-3xl font-semibold">What is UPI?</h2>
//         </div>
//         <p className="text-gray-700 text-lg leading-relaxed">
//           UPI stands for <strong>Unified Payments Interface</strong> — it connects your bank account to apps like PhonePe, Google Pay, Paytm, and more. No wallet? No problem. Just a tap and boom — payment sent. 💥📲
//         </p>
//       </section>

//       {/* 🔄 Real-time Magic */}
//       <section className="grid md:grid-cols-2 items-center gap-10 bg-gradient-to-r from-green-100 to-lime-100 p-8 md:p-10 rounded-3xl shadow-lg">
//         <div>
//           <h3 className="text-2xl font-semibold text-green-700 mb-3">🔄 How It Works</h3>
//           <ul className="text-base text-gray-800 list-disc pl-6 space-y-2">
//             <li>You scan a QR or enter a UPI ID</li>
//             <li>App talks to your bank instantly</li>
//             <li>Money moves directly — no middlemen</li>
//           </ul>
//         </div>
//         <div className="bg-white p-6 rounded-2xl shadow-md border border-green-300">
//           <h4 className="text-green-600 font-semibold mb-2 text-lg">🚀 Why It’s Awesome</h4>
//           <p className="text-gray-700 leading-relaxed">
//             24/7, no need for bank timings. Fast, safe, and cash-free. Plus — no need to remember IFSC, account numbers, or sort codes. Just your UPI ID: simple@bank.
//           </p>
//         </div>
//       </section>

//       {/* 😂 Everyday Scenarios */}
//       <section className="bg-white/90 p-8 rounded-3xl shadow-xl border-l-[6px] border-yellow-400">
//         <div className="text-yellow-700 font-semibold text-2xl flex items-center gap-3 mb-4">
//           <FaMoneyCheckAlt className="text-2xl" />
//           Everyday Moments, UPI Style
//         </div>
//         <ul className="text-gray-800 space-y-5 text-lg leading-relaxed">
//           <li>🛵 Zomato guy waiting? UPI him before your mom says “beta, give cash.”</li>
//           <li>👯‍♀️ Friend paid for pizza? Split it with UPI in 5 seconds flat.</li>
//           <li>🧾 Forgot your wallet? Just say, “I’ll UPI you!” and keep vibing.</li>
//         </ul>
//       </section>

//       {/* 🧠 Quiz Time */}
//       <section className="bg-lime-100 p-8 md:p-10 rounded-3xl shadow-xl border-l-[6px] border-lime-600">
//         <h3 className="text-lime-700 text-2xl font-semibold mb-4">🧠 Quick Quiz!</h3>
//         <p className="text-gray-800 text-lg mb-6">
//           Which of the following payment methods allows <strong>instant bank-to-bank transfer</strong> using just a phone number or UPI ID?
//         </p>
//         <div className="space-y-4">
//           <button
//             className={`w-full text-left px-6 py-4 rounded-xl shadow-md transition-all ${
//               selected === "neft" ? "bg-red-100" : "bg-white"
//             } hover:bg-gray-100 border`}
//             onClick={() => handleAnswer("neft")}
//           >
//             🕒 NEFT (National Electronic Funds Transfer)
//           </button>
//           <button
//             className={`w-full text-left px-6 py-4 rounded-xl shadow-md transition-all ${
//               selected === "cheque" ? "bg-red-100" : "bg-white"
//             } hover:bg-gray-100 border`}
//             onClick={() => handleAnswer("cheque")}
//           >
//             🧾 Cheque Deposit
//           </button>
//           <button
//             className={`w-full text-left px-6 py-4 rounded-xl shadow-md transition-all ${
//               selected === "upi" ? "bg-green-100" : "bg-white"
//             } hover:bg-gray-100 border`}
//             onClick={() => handleAnswer("upi")}
//           >
//             ⚡ UPI (Unified Payments Interface)
//           </button>
//         </div>
//       </section>

//       {/* ✅ Summary */}
//       <section className="bg-green-100 p-6 md:p-8 rounded-xl border-l-4 border-green-600 text-gray-800">
//         <h4 className="text-green-700 font-semibold text-2xl mb-2">💬 Final Takeaway</h4>
//         <p className="text-lg leading-relaxed">
//           UPI made money move as easy as messaging. No queues, no slips, just instant smart payments. Time to say goodbye to "Do you have change?"
//         </p>
//       </section>

//       {/* 👉 Next Button */}
//       <div className="flex justify-end mt-10">
//         <button
//           onClick={onNext}
//           className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition duration-300"
//         >
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// }
