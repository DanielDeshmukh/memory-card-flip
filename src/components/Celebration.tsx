import React from 'react';

interface CelebrationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Celebration: React.FC<CelebrationProps> = ({ isOpen, onClose }) => {
  const confettiCount = 50;
  const confettiColors = ['#76b900', '#5a8d00', '#ffffff', '#f7f7f7'];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onClick={onClose}
    >
      {/* Confetti Particles (Pure CSS) */}
      {Array.from({ length: confettiCount }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 animate-fall"
          style={{
            backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            left: `${Math.random() * 100}%`,
            top: '-10%',
            animationDuration: `${2 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}

      {/* Celebration Text */}
      <div className="text-center text-white p-8 rounded-sm bg-black border-2 border-[#76b900] shadow-[0_0_20px_rgba(118,185,0,0.5)] animate-bounce-in">
        <h1 className="text-6xl font-bold mb-4 text-[#76b900]">🎉 CONGRATULATIONS! 🎉</h1>
        <p className="text-2xl font-semibold mb-6">You matched all pairs!</p>
        <button
          onClick={onClose}
          className="px-8 py-3 bg-[#76b900] text-black font-bold rounded-sm shadow-lg hover:bg-[#5a8d00] transform hover:scale-105 transition-all duration-200"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Celebration;