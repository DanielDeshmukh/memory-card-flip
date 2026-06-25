import React from 'react';

interface ThemeSelectorProps {
  selectedTheme: string;
  onSelectTheme: (theme: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onSelectTheme }) => {
  const themes = [
    { id: 'animals', name: 'Animals', preview: ['🦁', '🐘', '🐼', '🦊'] },
    { id: 'flags', name: 'Flags', preview: ['🇺🇸', '🇯🇵', '🇧🇷', '🇩🇪'] },
    { id: 'emojis', name: 'Emojis', preview: ['🍎', '🍕', '🎮', '🌈'] }
  ];

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl shadow-lg border border-slate-200">
      <h3 className="text-lg font-bold text-slate-800 text-center">Choose a Theme</h3>
      
      <div className="grid grid-cols-3 gap-4">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onSelectTheme(theme.id)}
            className={`relative flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 cursor-pointer
              ${selectedTheme === theme.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-slate-200 bg-white hover:border-slate-300'
              }`
            }
          >
            <div className="flex gap-1 mb-2">
              {theme.preview.map((icon, index) => (
                <span key={index} className="text-2xl">{icon}</span>
              ))}
            </div>
            <span className="text-sm font-medium text-slate-700">{theme.name}</span>
            
            {selectedTheme === theme.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
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