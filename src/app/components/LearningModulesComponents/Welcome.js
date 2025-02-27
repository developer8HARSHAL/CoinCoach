"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Welcome() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6 text-center relative">
           
            <motion.h1 
                initial={{ opacity: 0, y: -50, scale: 0.8 }} 
                whileInView={{ opacity: 1, y: 0, scale: 1 }} 
                transition={{ duration: 1, ease: "easeOut" }} 
                viewport={{ once: true }}
                className="text-4xl font-bold text-blue-700 mb-4 relative"
            >
                Hey Learner
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, x: -50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }} 
                viewport={{ once: true }}
                className="text-lg text-gray-700 mb-6 max-w-2xl relative"
            >
                I found a message for you. Click the below button to see it!
            </motion.p>
            <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, x: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="bg-blue-700 text-white p-4 rounded-full shadow-md hover:bg-blue-800 transition relative"
            >                 📩
            </motion.button>

            {isOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
        >
            <h2 className="text-xl font-bold mb-4">Welcome to the first module</h2>

            {/* Flying Element */}
            <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="flex justify-center items-center mb-4 text-3xl"
            >
                💰 {/* You can replace this with an SVG or another animated element */}
            </motion.div>

            <p className="text-gray-700">
                Explore various topics to improve your financial literacy and make informed decisions.
            </p>

            <button 
                onClick={() => setIsOpen(false)}
                className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
            >
                Close
            </button>
        </motion.div>
    </div>
)}

        </div>
    );
}

