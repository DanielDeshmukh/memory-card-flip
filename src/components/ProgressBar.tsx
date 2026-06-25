import React from 'react';

interface ProgressBarProps {
  matchedPairs: number;
  totalPairs: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ matchedPairs, totalPairs }) => {
  const percentage = (matchedPairs / totalPairs) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        <span>Matched</span>
        <span>{matchedPairs} / {totalPairs} pairs</span>
      </div>
      <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;