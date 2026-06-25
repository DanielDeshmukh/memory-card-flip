import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CelebrationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Celebration: React.FC<CelebrationProps> = ({ isOpen, onClose }) => {
  const confettiCount = 50;
  const confettiColors = ['#76b900', '#5a8d00', '#ffffff', '#f7f7f7'];

  const confettiVariants = {
    initial: { y: -100, x: Math.random() * 100 },
    animate: {
      y: 1000,
      x: Math.random() * 100,
      rotate: Math.random() * 360,
      opacity: 0,
      transition: {
        duration: 2 + Math.random() * 2,
        delay: Math.random() * 0.5,
        ease: 'easeOut'
      }
    }
  };

  const bounceVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1.2,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.4 }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Confetti Particles */}
        {Array.from({ length: confettiCount }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2"
            style={{
              backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
              left: `${Math.random() * 100}%`,
              top: '-10%',
            }}
            variants={confettiVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        ))}

        {/* Celebration Text */}
        <motion.div
          className="text-center text-white p-8 rounded-sm bg-black border-2 border-[#76b900] shadow-[0_0_20px_rgba(118,185,0,0.5)]"
          variants={bounceVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <h1 className="text-6xl font-bold mb-4 text-[#76b900]">🎉 CONGRATULATIONS! 🎉</h1>
          <p className="text-2xl font-semibold mb-6">You matched all pairs!</p>
          <button
            onClick={onClose}
            className="px-8 py-3 bg-[#76b900] text-black font-bold rounded-sm shadow-lg hover:bg-[#5a8d00] transform hover:scale-105 transition-all duration-200"
          >
            Play Again
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Celebration;
