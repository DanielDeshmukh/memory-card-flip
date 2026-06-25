import { useState, useCallback, useEffect } from 'react';

interface UseCardPreviewReturn {
  previewedCardIds: Set<string>;
  isPreviewActive: boolean;
  handlePreview: (cardId: string) => Promise<void>;
  resetPreview: () => void;
}

/**
 * Hook to manage the beginner-friendly card preview feature.
 * Automatically reveals the first two cards flipped by the user,
 * regardless of whether they match, to help new players learn the game.
 */
export function useCardPreview(): UseCardPreviewReturn {
  const [previewedCardIds, setPreviewedCardIds] = useState<Set<string>>(new Set());
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [previewCount, setPreviewCount] = useState(0);

  const resetPreview = useCallback(() => {
    setPreviewedCardIds(new Set());
    setIsPreviewActive(false);
    setPreviewCount(0);
  }, []);

  const handlePreview = useCallback(async (cardId: string) => {
    // If we have already previewed 2 cards, this hook does nothing
    if (previewCount >= 2) {
      return;
    }

    // If this is the first preview, activate the mode
    if (previewCount === 0) {
      setIsPreviewActive(true);
    }

    // Add to previewed set
    setPreviewedCardIds((prev) => {
      const newSet = new Set(prev);
      newSet.add(cardId);
      return newSet;
    });

    // Increment counter
    setPreviewCount((prev) => prev + 1);
  }, [previewCount]);

  return {
    previewedCardIds,
    isPreviewActive,
    handlePreview,
    resetPreview,
  };
}