"use client"
import { motion } from "framer-motion";
import { useState } from "react";

export default function CompoundingTheory() {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-300 to-green-100 p-6 text-center">
            <motion.h1 
                className="text-4xl font-extrabold text-green-900 mb-6 drop-shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Chapter 1
            </motion.h1>
            <motion.h1 
                className="text-4xl font-extrabold text-green-900 mb-6 drop-shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                The Magic of Compounding! 🌱
            </motion.h1>
            <motion.p 
                className="text-lg text-gray-800 max-w-2xl mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
             Imagine planting a tiny seed and watching it grow into a huge tree over time. That’s exactly how compounding works with your savings and investments!
            </motion.p>
            <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-xl max-w-xl border-l-4 border-green-700 hover:shadow-green-500/50"
                whileHover={{ scale: 1.05 }}
            >
                <h2 className="text-2xl font-semibold text-green-800">What is Compounding?</h2>
                <p className="text-gray-800 mt-4">
                    Compounding is the process where your savings or investments generate earnings, and those earnings are reinvested to generate even more earnings over time. 
                    This creates a snowball effect – the longer you save and invest, the more your wealth grows.
                </p>
                <h2 className="text-2xl font-semibold text-green-800 mt-6">The Magic Formula</h2>
                <p className="text-gray-800 mt-4">The power of compounding is based on a simple formula:</p>
                <motion.div 
                    className="mt-4 text-lg font-bold text-gray-900 bg-gray-300 p-4 rounded-md cursor-pointer"
                >
                    A = P ( 1 + r / n )<sup>nt</sup>
                </motion.div>
            </motion.div>
        </div>
    );
}
