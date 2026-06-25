import React from 'react';
import StatsBar from './StatsBar';
import GameGrid from './GameGrid';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-green-500 mb-6">Memory Card Flip</h1>
      <StatsBar />
      <GameGrid />
    </div>
  );
};

export default App;