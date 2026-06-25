import React from 'react';
import { useGameStore } from '../store/gameStore';
import { DifficultyConfig } from '../types';

const DifficultySelector: React.FC = () => {
  const { difficulty, setDifficulty } = useGameStore();

  const difficultyOptions: DifficultyConfig[] = [
    { label: 'Easy', rows: 4, cols: 4, pairs: 8 },
    { label: 'Medium', rows: 4, cols: 6, pairs: 12 },
    { label: 'Hard', rows: 6, cols: 6, pairs: 18 },
  ];

  const getGridSizeLabel = (rows: number, cols: number) => `${rows}x${cols}`;

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-black border border-[#76b900] rounded-sm shadow-lg">
      <h3 className="text-lg font-bold text-[#76b900]">SELECT DIFFICULTY</h3>
      <div className="flex space-x-4">
        {difficultyOptions.map((option) => (
          <button
            key={option.label}
            onClick={() => setDifficulty(option)}
            className={`flex flex-col items-center justify-center p-4 rounded-sm transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#76b900] ${
              difficulty.label === option.label
                ? 'bg-[#76b900] text-black shadow-lg scale-105'
                : 'bg-[#1a1a1a] text-white border border-[#76b900] hover:bg-[#2a2a2a]'
            }`}
            aria-label={option.label}
          >
            <span className="font-semibold text-sm mb-1">{option.label}</span>
            <span className="text-xs bg-black bg-opacity-80 rounded-sm px-2 py-1 text-white">{getGridSizeLabel(option.rows, option.cols)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;
