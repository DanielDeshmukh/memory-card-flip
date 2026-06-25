import { useState, useCallback, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

export type FlipState = 'idle' | 'flipping' | 'matched' | 'hidden';

export interface UseFlipStateReturn {
  state: FlipState;
  isFlipped: boolean;
  isMatched: boolean;
  handleFlip: () => void;
  resetCard: () => void;
  setMatched: () => void;
}

/**
 * Custom hook to manage the flip state machine for a single card.
 * Handles transitions: idle -> flipping -> (matched | hidden)
 * Controls animation states for Framer Motion.
 */
export function useFlipState(cardId: string): UseFlipStateReturn {
  const [state, setState] = useState<FlipState>('idle');
  const [isMatched, setIsMatched] = useState(false);

  // Access global store to check if this card is currently being processed
  const { flippedCards, matchedPairs, handleCardClick, resetFlippedCards } = useGameStore();

  const isFlipped = state === 'flipping' || state === 'matched';

  // Update local state when global matchedPairs changes
  // Note: matchedPairs should be an array of card IDs that have been matched
  // If matchedPairs contains pairs like [id1, id2], we assume cardId is in that array
  useEffect(() => {
    if (matchedPairs.includes(cardId)) {
      setState('matched');
      setIsMatched(true);
    } else if (state === 'matched' && !matchedPairs.includes(cardId)) {
      // Fallback: if card was unmatched (shouldn't happen normally)
      setState('idle');
      setIsMatched(false);
    }
  }, [matchedPairs, cardId, state]);

  const handleFlip = useCallback(() => {
    if (state !== 'idle' && state !== 'matched') return;
    if (isMatched) return;

    // Trigger global click handler which manages the 2-card logic
    handleCardClick(cardId);

    // Optimistically set local state to flipping for animation
    setState('flipping');
  }, [state, isMatched, cardId, handleCardClick]);

  const setMatched = useCallback(() => {
    setState('matched');
    setIsMatched(true);
  }, []);

  const resetCard = useCallback(() => {
    setState('idle');
    setIsMatched(false);
  }, []);

  return {
    state,
    isFlipped,
    isMatched,
    handleFlip,
    resetCard,
    setMatched,
  };
}