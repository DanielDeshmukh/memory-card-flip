import React from 'react';

interface ProgressBarProps {
  matchedPairs: number;
  totalPairs: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ matchedPairs, totalPairs }) => {
  const percentage = (matchedPairs / totalPairs) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex justify-between text-sm font-medium text-[#76b900] mb-2">
        <span>PROGRESS</span>
        <span>{matchedPairs} / {totalPairs} PAIRS</span>
      </div>
      <div className="w-full h-3 bg-[#1a1a1a] border border-[#76b900] rounded-sm overflow-hidden">
        <div 
          className="h-full bg-[#76b900] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
