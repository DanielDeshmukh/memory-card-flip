import React from 'react';
import { useGameStore } from '../store/gameStore';

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const StatsBar: React.FC = () => {
  const { timeElapsed, matchedPairs, totalPairs, moves, isGameOver } = useGameStore();

  const safeTime = timeElapsed ?? 0;
  const safeMatched = matchedPairs ?? 0;
  const safeTotal = totalPairs ?? 0;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 p-6 bg-black border border-[#76b900] rounded-sm shadow-lg flex flex-wrap justify-between items-center gap-4">
      {/* Timer Section */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-[#1a1a1a] border border-[#76b900] rounded-sm">
          <span className="text-[#76b900] text-sm font-semibold uppercase tracking-wider">TIME</span>
        </div>
        <div className="text-2xl font-mono font-bold text-white">
          {formatTime(safeTime)}
        </div>
      </div>

      {/* Moves Section */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-[#1a1a1a] border border-[#76b900] rounded-sm">
          <span className="text-[#76b900] text-sm font-semibold uppercase tracking-wider">MOVES</span>
        </div>
        <div className="text-2xl font-bold text-white">
          {moves}
        </div>
      </div>

      {/* Matched Pairs Section */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-[#1a1a1a] border border-[#76b900] rounded-sm">
          <span className="text-[#76b900] text-sm font-semibold uppercase tracking-wider">MATCHES</span>
        </div>
        <div className="text-2xl font-bold text-white">
          {safeMatched} <span className="text-[#76b900] text-lg">/</span> {safeTotal}
        </div>
      </div>

      {/* Game Status Indicator */}
      {isGameOver && (
        <div className="w-full mt-4 p-4 bg-[#1a1a1a] border border-[#76b900] rounded-sm text-center">
          <span className="text-[#76b900] font-bold text-lg">🎉 GAME COMPLETED!</span>
        </div>
      )}
    </div>
  );
};

export default StatsBar;
