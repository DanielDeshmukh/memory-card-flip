import React from 'react';
import { useGameStore } from '../store/gameStore';

interface DifficultyOption {
  label: string;
  rows: number;
  cols: number;
  color: string;
}

const DifficultySelector: React.FC = () => {
  const { difficulty, setDifficulty } = useGameStore();

  const difficultyOptions: DifficultyOption[] = [
    { label: 'Easy', rows: 4, cols: 4, color: 'bg-green-400' },
    { label: 'Medium', rows: 6, cols: 6, color: 'bg-yellow-400' },
    { label: 'Hard', rows: 8, cols: 8, color: 'bg-red-400' },
  ];

  const getGridSizeLabel = (rows: number, cols: number) => `${rows}x${cols}`;

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-slate-100 rounded-2xl shadow-lg backdrop-blur-sm bg-opacity-90">
      <h3 className="text-lg font-bold text-slate-800">Select Difficulty</h3>
      <div className="flex space-x-4">
        {difficultyOptions.map((option) => (
          <button
            key={option.label}
            onClick={() => setDifficulty(option)}
            className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              difficulty.label === option.label
                ? `${option.color} text-white shadow-lg scale-105`
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
            aria-label={option.label}
          >
            <span className="font-semibold text-sm mb-1">{option.label}</span>
            <span className="text-xs bg-white bg-opacity-80 rounded-full px-2 py-1">{getGridSizeLabel(option.rows, option.cols)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;