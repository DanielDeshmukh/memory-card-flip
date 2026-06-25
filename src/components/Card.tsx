import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

interface CardProps {
  id: string;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  isPreviewEnabled: boolean;
}

const Card: React.FC<CardProps> = ({
  id,
  value,
  isFlipped,
  isMatched,
  onClick,
  isPreviewEnabled,
}) => {
  const handleClick = () => {
    if (!isMatched) {
      onClick();
    }
  };

  return (
    <motion.div
      className={`card-container ${isMatched ? 'matched' : ''}`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
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
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: '700',
            color: '#000000',
            boxShadow: '0 0 0 1px #76b900',
            backgroundImage: isPreviewEnabled && !isFlipped ? 'linear-gradient(135deg, #f7f7f7, #e2e8f0)' : 'none',
          }}
        >
          {value}
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
            backgroundColor: '#1a1a1a',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: '700',
            color: '#76b900',
            boxShadow: '0 0 0 1px #76b900',
            backgroundImage: 'none',
          }}
        >
          ?
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
