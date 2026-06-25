import React from 'react';
import { useGameStore } from '../store/gameStore';
import { THEMES } from '../data/themes';

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useGameStore();

  return (
    <div className="flex flex-col gap-6 p-6 bg-black border border-[#76b900] rounded-sm shadow-lg">
      <h3 className="text-lg font-bold text-[#76b900] text-center">CHOOSE A THEME</h3>
      
      <div className="grid grid-cols-3 gap-4">
        {THEMES.map((themeOption) => (
          <button
            key={themeOption.id}
            onClick={() => setTheme(themeOption.id)}
            className={`relative flex flex-col items-center justify-center p-4 rounded-sm transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 cursor-pointer
              ${theme.id === themeOption.id
                ? 'border-[#76b900] bg-[#1a1a1a] shadow-md'
                : 'border-[#76b900] bg-black hover:bg-[#1a1a1a]'
              }`}
          >
            <div className="flex gap-1 mb-2">
              {themeOption.items.slice(0, 4).map((icon, index) => (
                <span key={index} className="text-2xl">{icon}</span>
              ))}
            </div>
            <span className="text-sm font-medium text-white">{themeOption.name}</span>
            
            {theme.id === themeOption.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#76b900] text-black rounded-sm flex items-center justify-center text-xs font-bold">
                ✓
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
