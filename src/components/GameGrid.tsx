import React from 'react';
import { useGameStore } from '../store/gameStore';
import Card from './Card';
import { getGridSize } from '../config/gameConfig';

const GameGrid: React.FC = () => {
  const { cards, flippedCards, matchedCards, handleCardClick } = useGameStore();
  const gridSize = getGridSize();

  return (
    <div className="grid gap-4 justify-items-center items-center p-6"
         style={{
           gridTemplateColumns: `repeat(${gridSize}, 1fr)`
         }}>
      {cards.map((card, index) => (
        <Card
          key={index}
          id={index}
          front={card.front}
          back={card.back}
          isFlipped={flippedCards.includes(index)}
          isMatched={matchedCards.includes(index)}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
};

export default GameGrid;