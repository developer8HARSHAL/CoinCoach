'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from './auth/AuthContext';
import { useToast } from '@/hooks/use-toast';

const GameCard = ({ name, description, link, gameId }) => {
  const [isPlayed, setIsPlayed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Check if game is already played when component mounts
  useEffect(() => {
    const checkGameStatus = async () => {
      if (!user || !gameId) return;
      
      try {
        const response = await fetch(`/api/user/games/status?email=${encodeURIComponent(user.email)}&gameId=${gameId}`);
        if (response.ok) {
          const data = await response.json();
          setIsPlayed(data.isPlayed);
        }
      } catch (error) {
        console.error('Error checking game status:', error);
      }
    };

    checkGameStatus();
  }, [user, gameId]);

  // Mark game as played when clicked
  const handleGameClick = async (e) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to track your game progress.',
        variant: 'destructive',
      });
      return;
    }

    if (!gameId) {
      console.error('Game ID is required for tracking');
      return;
    }

    // Don't prevent navigation, but mark as played
    if (!isPlayed) {
      setLoading(true);
      try {
        const response = await fetch('/api/user/games/mark-played', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            gameId: gameId,
            gameName: name,
            gameDescription: description,
            gameLink: link
          }),
        });

        if (response.ok) {
          setIsPlayed(true);
          toast({
            title: 'Game Started!',
            description: `${name} has been marked as played.`,
            variant: 'default',
          });
        }
      } catch (error) {
        console.error('Error marking game as played:', error);
        toast({
          title: 'Tracking Failed',
          description: 'Could not track game progress, but you can still play!',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Link href={link} passHref>
      <div 
        className={`relative w-full max-w-sm bg-white rounded-xl p-6 shadow-lg border transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl group overflow-hidden ${
          isPlayed ? 'border-green-300 bg-green-50' : 'border-gray-200'
        }`}
        onClick={handleGameClick}
      >
        
        {/* Decorative background glow */}
        <div className={`absolute -inset-1 opacity-20 blur-xl group-hover:opacity-30 transition duration-300 pointer-events-none ${
          isPlayed ? 'bg-gradient-to-br from-green-300 to-emerald-300' : 'bg-gradient-to-br from-purple-300 to-indigo-300'
        }`}></div>

        {/* Played Status Badge */}
        {isPlayed && (
          <div className="absolute top-3 right-3 z-30">
            <div className="flex items-center gap-1 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              <CheckCircle className="w-3 h-3" />
              Played
            </div>
          </div>
        )}

        <div className="relative z-10 space-y-3">
          <h2 className={`text-2xl font-extrabold transition ${
            isPlayed ? 'text-green-800 group-hover:text-green-700' : 'text-gray-800 group-hover:text-indigo-700'
          }`}>
            {name}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl z-20">
          <span className={`flex items-center gap-2 font-semibold px-4 py-2 rounded-md shadow transition ${
            loading ? 'bg-gray-400 text-white cursor-not-allowed' : 
            isPlayed ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-white text-indigo-700 hover:bg-indigo-100'
          }`}>
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Tracking...
              </>
            ) : isPlayed ? (
              <>
                Play Again <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Play Now <ArrowRight className="w-4 h-4" />
              </>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;