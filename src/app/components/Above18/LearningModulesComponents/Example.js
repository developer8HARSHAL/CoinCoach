"use client"
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lottie from "lottie-react";
import Person1 from "../../lotties/person1.json";
import Person2 from "../../lotties/person2.json";

export default function Example() {
    const [hoveredPerson, setHoveredPerson] = useState(null);
    const { scrollYProgress } = useScroll(); // Track scroll progress

    // Move rocket from left (-100%) to right (100%) as user scrolls
    const x = useTransform(scrollYProgress, [0,1], ["-1000%", "1000%"]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-300 to-purple-100 p-6 text-center">
             <motion.span
                className="absolute text-4xl"
                style={{ x }} // Bind x position to scroll
                transition={{ ease: "linear" }}
            >
                🚀
            </motion.span>

            {/* Title */}
            <motion.h1 
                className="text-4xl font-extrabold text-purple-900 mb-6 drop-shadow-lg text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                The Power of Starting Early!
            </motion.h1>
            <motion.p 
                className="text-lg text-gray-800 max-w-2xl mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                Even though both saved for the same time, starting earlier leads to significantly more wealth by retirement! Hover over each person to see their saving journey.
            </motion.p>
            <div className="flex space-x-28">
                <motion.div
                    className="relative flex flex-col items-center cursor-pointer"
                    onHoverStart={() => setHoveredPerson("A")}
                    onHoverEnd={() => setHoveredPerson(null)}
                >
                    <motion.div
                        className="w-28 h-36 flex items-center justify-center bg-white shadow-xl rounded-full p-4 transition-all duration-300 hover:shadow-purple-500/50"
                        whileHover={{ scale: 1.1 }}
                    >
                        <Lottie animationData={Person1} />
                    </motion.div>
                    {hoveredPerson === "A" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-36 w-72 p-5 bg-white text-black shadow-xl rounded-lg border-l-4 border-purple-700"
                        >
                            <h2 className="text-xl font-semibold text-purple-800">Person A</h2>
                            <p className="text-sm text-gray-700">Starts saving $100/month at age 25, stops at 35 (10 years of saving).</p>
                        </motion.div>
                    )}
                </motion.div>

                <motion.div
                    className="relative flex flex-col items-center cursor-pointer"
                    onHoverStart={() => setHoveredPerson("B")}
                    onHoverEnd={() => setHoveredPerson(null)}
                >
                    <motion.div
                        className="w-28 h-36 flex items-center justify-center bg-white shadow-xl rounded-full p-4 transition-all duration-300 hover:shadow-purple-500/50"
                        whileHover={{ scale: 1.1 }}
                    >
                        <Lottie animationData={Person2} />
                    </motion.div>
                    {hoveredPerson === "B" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-36 w-72 p-5 bg-white text-black shadow-xl rounded-lg border-l-4 border-purple-700"
                        >
                            <h2 className="text-xl font-semibold text-purple-800">Person B</h2>
                            <p className="text-sm text-gray-700">Starts saving $100/month at age 35, stops at 45 (10 years of saving).</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}