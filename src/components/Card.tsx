import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

interface CardProps {
  id: string;
  front: string;
  back: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  isPreviewEnabled: boolean;
}

const Card: React.FC<CardProps> = ({
  id,
  front,
  back,
  isFlipped,
  isMatched,
  onClick,
  isPreviewEnabled,
}) => {
  // Disable click if matched
  const handleClick = () => {
    if (!isMatched) {
      onClick();
    }
  };

  return (
    <motion.div
      className={`card-container ${isMatched ? 'matched' : ''}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="card"
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: 'easeInOut',
        }}
        style={{
          transformStyle: 'preserve-3d',
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Front Face (Content) */}
        <div
          className="card-face card-front"
          style={{
            backfaceVisibility: 'hidden',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1e40af',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            backgroundImage: isPreviewEnabled && !isFlipped ? 'linear-gradient(135deg, #60a5fa, #3b82f6)' : 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
          }}
        >
          {front}
        </div>

        {/* Back Face (Pattern/Hidden) */}
        <div
          className="card-face card-back"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: '#1e40af',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: '700',
            color: '#f8fafc',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            backgroundImage: 'linear-gradient(135deg, #1e40af, #0f172a)',
          }}
        >
          {back}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;