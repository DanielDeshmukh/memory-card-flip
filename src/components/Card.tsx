import React from 'react';
import './Card.css';

interface CardProps {
  id: string;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({
  id,
  value,
  isFlipped,
  isMatched,
  onClick,
}) => {
  const handleClick = () => {
    if (!isMatched) {
      onClick();
    }
  };

  return (
    <div
      className={`card-container ${isMatched ? 'matched' : ''} ${isFlipped ? 'flipped' : ''}`}
      onClick={handleClick}
      data-card-id={id}
    >
      <div className="card-inner">
        {/* Front Face (Content) - Visible when flipped */}
        <div className="card-face card-front">
          {value}
        </div>

        {/* Back Face (Hidden) - Visible when not flipped */}
        <div className="card-face card-back">
          ?
        </div>
      </div>
    </div>
  );
};

export default Card;