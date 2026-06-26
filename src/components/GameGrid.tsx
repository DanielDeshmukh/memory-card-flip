import React from 'react';
import Card from './Card';
import { useGameStore } from '../store/gameStore';
import { Card as CardType } from '../types';

const GameGrid: React.FC = () => {
  const { cards, flipCard, difficulty } = useGameStore();

  // Safety check for undefined cards
  if (!cards || cards.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading cards...
      </div>
    );
  }

  const gridCols = difficulty.cols;
  // Calculate max width based on cols * 110px (approx 100px card + 10px gap)
  const maxWidth = gridCols * 110;

  return (
    <div 
      className="grid gap-2 mt-8 mx-auto" 
      style={{ 
        gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
        maxWidth: `${maxWidth}px`,
        perspective: '1000px'
      }}
    >
      {cards.map((card: CardType) => {
        const isFlipped = card.isFlipped || card.isMatched;
        return (
          <div key={card.id} style={{ minHeight: '100px', minWidth: '100px' }}>
            <Card
              id={card.id}
              value={card.value}
              isFlipped={isFlipped}
              isMatched={card.isMatched}
              onClick={() => flipCard(card.id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GameGrid;