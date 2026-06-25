import React, { useEffect } from 'react';
import ThemeSelector from './components/ThemeSelector';
import DifficultySelector from './components/DifficultySelector';
import GameGrid from './components/GameGrid';
import StatsBar from './components/StatsBar';
import ProgressBar from './components/ProgressBar';
import Celebration from './components/Celebration';
import { useGameStore } from './store/gameStore';
import './App.css';

const App: React.FC = () => {
  const { initializeGame, cards, timeElapsed, isPlaying, tickTimer, stopTimer } = useGameStore();

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Timer Logic
  useEffect(() => {
    let interval: number | undefined;
    if (isPlaying && !cards.every(c => c.isMatched)) {
      interval = window.setInterval(() => {
        tickTimer();
      }, 1000);
    } else {
      stopTimer();
    }
    return () => clearInterval(interval);
  }, [isPlaying, cards, tickTimer, stopTimer]);

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-[#76b900] mb-2">
          MEMORY CARD FLIP
        </h1>
        <p className="text-gray-400">Match pairs to win!</p>
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

      <footer className="mt-12 text-center text-gray-500">
        <p>Challenge yourself with different themes and difficulty levels!</p>
      </footer>

      <Celebration />
    </div>
  );
};

export default App;
