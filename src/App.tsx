import React from 'react';
import ThemeSelector from './components/ThemeSelector';
import DifficultySelector from './components/DifficultySelector';
import GameGrid from './components/GameGrid';
import StatsBar from './components/StatsBar';
import ProgressBar from './components/ProgressBar';
import Celebration from './components/Celebration';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-4">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Memory Card Flip
        </h1>
        <p className="text-slate-300">Match pairs to win!</p>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <ThemeSelector />
          <DifficultySelector />
        </div>

        <StatsBar />
        <ProgressBar />
        
        <div className="flex justify-center mt-6">
          <GameGrid />
        </div>
      </main>

      <footer className="mt-12 text-center text-slate-400">
        <p>Challenge yourself with different themes and difficulty levels!</p>
      </footer>

      <Celebration />
    </div>
  );
};

export default App;