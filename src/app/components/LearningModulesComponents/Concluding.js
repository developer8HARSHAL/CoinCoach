"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useInView } from "react-intersection-observer";

export default function Conclusion() {
    const [showConfetti, setShowConfetti] = useState(false);
    const { ref, inView } = useInView({ triggerOnce: true });

    useEffect(() => {
        if (inView) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000); // Stop after 3 sec
        }
    }, [inView]);

    return (
        <div ref={ref} className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-400 to-yellow-100 p-6 text-center">
            {showConfetti && <Confetti numberOfPieces={200} gravity={0.3} />}
            
            <motion.div
                className="bg-white p-6 rounded-lg shadow-xl max-w-xl border-l-4 border-green-700 mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05, boxShadow: "0px 4px 20px rgba(34, 197, 94, 0.5)" }}
            >
                <motion.p 
                    className="text-xl font-semibold text-green-800"
                    whileHover={{ scale: 1.1 }}
                >
                    "Start early, stay consistent, and watch your money grow! 🌿"
                </motion.p>
            </motion.div>
        </div>
    );
}
