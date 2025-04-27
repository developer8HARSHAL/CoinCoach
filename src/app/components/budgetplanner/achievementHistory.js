'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function AchievementHistory() {
  const router = useRouter();

  return (
    <div className="p-6">
      <button onClick={() => router.back()} className="text-sm text-blue-600 mb-4">← Back</button>
      <div className="bg-white rounded-xl shadow p-4 w-full max-w-md border">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">🏆 Achievement History</h2>
        </div>
        <p className="text-gray-600 text-sm">Your achievement history will be displayed here.</p>
      </div>
    </div>
  );
}
