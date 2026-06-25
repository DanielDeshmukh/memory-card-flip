import React from 'react';
import Card from './Card';
import { useGameStore } from '../store/gameStore';
import { Card as CardType } from '../types';

const GameGrid: React.FC = () => {
  const { cards, flipCard, difficulty, isPreviewEnabled } = useGameStore();

  // Safety check for undefined cards
  if (!cards || cards.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading cards...
      </div>
    );
  }

  const gridCols = difficulty.cols;

  return (
    <div 
      className="grid gap-4 mt-8 max-w-4xl mx-auto" 
      style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
    >
      {cards.map((card: CardType) => (
        <Card
          key={card.id}
          id={card.id}
          value={card.value}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={() => flipCard(card.id)}
          isPreviewEnabled={isPreviewEnabled}
        />
      ))}
    </div>
  );
};

export default GameGrid;
