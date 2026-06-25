import React from 'react';
import { useGameStore } from '../store/gameStore';

const StatsBar: React.FC = () => {
  const moves = useGameStore((state) => state.moves);
  const timeElapsed = useGameStore((state) => state.timeElapsed);
  const bestScore = useGameStore((state) => state.bestScore);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-slate-700 mb-6">
      <div className="flex items-center space-x-6 text-white">
        <div className="text-center">
          <p className="text-sm text-slate-300">Moves</p>
          <p className="text-2xl font-bold text-blue-400">{moves}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-300">Time</p>
          <p className="text-2xl font-bold text-green-400">{formatTime(timeElapsed)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-300">Best</p>
          <p className="text-2xl font-bold text-purple-400">{bestScore ? formatTime(bestScore) : '--:--'}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;