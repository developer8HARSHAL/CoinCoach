'use client';

import Link from 'next/link';
import React from 'react';

const GameCard = ({ name, description, link }) => {
  return (
    <div
    
      className="relative w-full max-w-sm bg-gradient-to-br from-indigo-100 to-purple-200 rounded-xl p-6 shadow-md cursor-pointer transition-transform duration-300 hover:scale-105 group"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-indigo-900">{name}</h2>
        <p className="text-sm text-gray-700">{description}</p>
      </div>

      {/* Hover overlay with button */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
       
            <button className="bg-white text-black font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition">
            Play Now
            </button>
         
      </div>
    </div>
  );
};

export default GameCard;
