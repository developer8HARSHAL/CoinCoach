import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const CongratulationModal = ({ onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full mx-4"
            >
                <div className="flex justify-center">
                    <CheckCircle size={60} className="text-green-500 mb-4 animate-bounce" />
                </div>
                <h2 className="text-3xl font-bold text-green-600 mb-2">Congratulations!</h2>
                <p className="mt-4 text-gray-700 text-lg">
                    You've successfully followed the 50/30/20 budgeting rule this month!
                </p>
                <p className="mt-2 text-gray-600">
                    You've earned a new achievement badge! 🏅
                </p>
                <button
                    onClick={onClose}
                    className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg text-lg font-medium transition-colors"
                >
                    Got it!
                </button>
            </motion.div>
        </motion.div>
    );
};

export default CongratulationModal;