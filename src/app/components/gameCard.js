'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const GameCard = ({ name, description, link }) => {
  return (
    <Link href={link} passHref>
      <div className="relative w-full max-w-sm bg-white rounded-xl p-6 shadow-lg border border-gray-200 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl group overflow-hidden">
        
        {/* Decorative background glow */}
        <div className="absolute -inset-1 bg-gradient-to-br from-purple-300 to-indigo-300 opacity-20 blur-xl group-hover:opacity-30 transition duration-300 pointer-events-none"></div>

        <div className="relative z-10 space-y-3">
          <h2 className="text-2xl font-extrabold text-gray-800 group-hover:text-indigo-700 transition">
            {name}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl z-20">
          <span className="flex items-center gap-2 bg-white text-indigo-700 font-semibold px-4 py-2 rounded-md shadow hover:bg-indigo-100 transition">
            Play Now <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
