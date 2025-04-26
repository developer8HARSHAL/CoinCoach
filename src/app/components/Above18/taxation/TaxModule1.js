"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function TaxModule1() {
    const [selectedType, setSelectedType] = useState(null);

    const handleSelect = (type) => {
      setSelectedType(type);
      window.scrollTo({ top: 300, behavior: "smooth" });
    };
    

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-yellow-50 to-orange-100 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto text-center">
      <motion.h1
          className="text-4xl text-black sm:text-5xl font-bold mb-4"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Taxation System of India
        </motion.h1>
        <motion.h1
          className="mt-10 text-emerald-700 text-4xl sm:text-4xl font-bold mb-4"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Module 1: 🧾 Types of Taxes in India
        </motion.h1>
        <motion.p
          className="text-gray-600 text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Understand the two primary categories of taxes: Direct and Indirect. Click to learn more!
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => handleSelect("direct")}
            className="cursor-pointer bg-white shadow-md rounded-2xl p-6 border-2 border-yellow-300 hover:border-yellow-500"
          >
            <h2 className="text-xl font-bold text-yellow-700 mb-2">📌 Direct Taxes</h2>
            <p className="text-gray-700">Taxes paid directly by individuals or organizations to the government.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => handleSelect("indirect")}
            className="cursor-pointer bg-white shadow-md rounded-2xl p-6 border-2 border-yellow-300 hover:border-yellow-500"
          >
            <h2 className="text-xl font-bold text-yellow-700 mb-2">🛍️ Indirect Taxes</h2>
            <p className="text-gray-700">Taxes levied on goods and services, paid indirectly through purchases.</p>
          </motion.div>
        </div>

        {selectedType && (
          <motion.div
            className="mt-12 bg-white rounded-xl shadow-xl p-8 text-left border border-yellow-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {selectedType === "direct" ? (
              <>
                <h3 className="text-2xl font-semibold text-yellow-700 mb-4">📌 What are Direct Taxes?</h3>
                <ul className="list-disc ml-6 text-gray-800 space-y-2 text-lg">
                  <li>Paid <b>directly</b> to the government by individuals and organizations.</li>
                  <li>Imposed on <b>income, wealth, and corporate profits.</b></li>
                  <li>Examples:
                    <ul className="list-circle ml-6">
                      <li>Income Tax</li>
                      <li>Corporate Tax</li>
                      <li>Capital Gains Tax</li>
                      <li>Wealth Tax (abolished, but historically relevant)</li>
                    </ul>
                  </li>
                  <li>It promotes <b>equity</b>, as higher earners pay more.</li>
                </ul>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-semibold text-yellow-700 mb-4">🛍️ What are Indirect Taxes?</h3>
                <ul className="list-disc ml-6 text-gray-800 space-y-2 text-lg">
                  <li>Levied on <b>goods and services</b>, paid <b>indirectly</b> by consumers.</li>
                  <li>Collected by sellers and passed on to the government.</li>
                  <li>Examples:
                    <ul className="list-circle ml-6">
                      <li>GST (Goods and Services Tax)</li>
                      <li>Excise Duty (on specific products)</li>
                      <li>Customs Duty (on imports/exports)</li>
                    </ul>
                  </li>
                  <li><b>Regressive in nature</b>, as it's same for all income groups.</li>
                </ul>
              </>
            )}

            <button
              onClick={() => setSelectedType(null)}
              className="mt-6 inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg transition-all"
            >
              Back to Choices <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
