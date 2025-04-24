"use client";

import React from "react";
import { motion } from "framer-motion";

const infoBlocks = [
  {
    title: "What is GST?",
    description:
      "GST (Goods and Services Tax) is a unified indirect tax levied on the supply of goods and services across India.",
  },
  {
    title: "Types of GST",
    description: "There are four major types: CGST, SGST, IGST, and UTGST, depending on the type of transaction.",
  },
  {
    title: "Common Rates",
    description: "GST is levied in slabs of 0%, 5%, 12%, 18%, and 28%, depending on the goods or services.",
  },
  {
    title: "Special Cases",
    description:
      "Exports are zero-rated. Small businesses below a certain threshold can be exempt from GST.",
  },
  {
    title: "Penalties",
    description: "Late filing or incorrect tax returns can lead to interest, penalties, or even prosecution.",
  },
  {
    title: "Real-life Example",
    description:
      "If a mobile phone costs ₹10,000 and GST is 18%, you pay ₹1,800 as GST, totaling ₹11,800.",
  },
];

const TaxModule3 = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-20"
      style={{
        backgroundImage: "url('/images/500rs.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 mt-0 max-w-6xl w-full text-white text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-10 drop-shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Understanding GST & Tax Filing 💰
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infoBlocks.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 text-left shadow-lg hover:scale-[1.02] transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h2 className="text-xl font-bold mb-2 text-yellow-300">{item.title}</h2>
              <p className="text-lg text-white">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaxModule3;
