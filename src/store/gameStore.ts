import { create } from 'zustand';
import { Card, GameState, DifficultyConfig, ThemeConfig } from '../types';
import { THEMES } from '../data/themes';
import { DIFFICULTY_CONFIGS } from '../constants';

interface GameStore extends GameState {
  // Actions
  initializeGame: () => void;
  flipCard: (id: string) => void;
  resetGame: () => void;
  setDifficulty: (difficulty: DifficultyConfig) => void;
  setTheme: (themeId: string) => void;
  togglePreview: () => void;
  closeCelebration: () => void;
  // Timer specific actions
  startTimer: () => void;
  stopTimer: () => void;
  tickTimer: () => void;
  incrementMoves: () => void;
}

const generateCards = (count: number, themeItems: string[]): Card[] => {
  const selected = themeItems.slice(0, count / 2);
  const doubled = [...selected, ...selected];
  
  // Shuffle
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }

  return doubled.map((value, index) => ({
    id: `card-${index}`,
    value,
    isFlipped: false,
    isMatched: false,
  }));
};

export const useGameStore = create<GameStore>((set, get) => {
  const defaultDifficulty: DifficultyConfig = DIFFICULTY_CONFIGS.easy;
  const defaultTheme = THEMES[0];

  return {
    // Initial State
    cards: [],
    difficulty: defaultDifficulty,
    theme: defaultTheme,
    timeElapsed: 0,
    moves: 0,
    matchedPairs: 0,
    totalPairs: 0,
    isPlaying: false,
    isGameOver: false,
    isPreviewEnabled: true,
    isCelebrationOpen: false,
    bestScores: {},

    initializeGame: () => {
      const { difficulty, theme } = get();
      const cards = generateCards(difficulty.pairs * 2, theme.items);
      set({
        cards,
        timeElapsed: 0,
        moves: 0,
        matchedPairs: 0,
        totalPairs: difficulty.pairs,
        isPlaying: false,
        isGameOver: false,
        isCelebrationOpen: false,
      });
    },

    flipCard: (id) => {
      const { cards, isPlaying, isGameOver, moves, matchedPairs, totalPairs, theme } = get();
      
      if (!isPlaying && cards.length === 0) {
        // Start game on first flip if not initialized
        set({ isPlaying: true });
      }
      
      if (!isPlaying || isGameOver) return;
      
      const cardIndex = cards.findIndex((c) => c.id === id);
      if (cardIndex === -1) return;
      
      const card = cards[cardIndex];
      if (card.isFlipped || card.isMatched) return;

      const newCards = [...cards];
      newCards[cardIndex] = { ...card, isFlipped: true };

      set({ cards: newCards, moves: moves + 1 });

      const flippedCards = newCards.filter(c => c.isFlipped && !c.isMatched);

      if (flippedCards.length === 2) {
        const [first, second] = flippedCards;
        if (first.value === second.value) {
          // Match found
          const matchedCards = newCards.map((c) =>
            c.id === first.id || c.id === second.id ? { ...c, isMatched: true } : c
          );
          const newMatchedPairs = matchedPairs + 1;
          
          set({
            cards: matchedCards,
            matchedPairs: newMatchedPairs,
          });

          if (newMatchedPairs === totalPairs) {
            set({ isGameOver: true, isCelebrationOpen: true });
          }
        } else {
          // No match - wait then unflip
          setTimeout(() => {
            const { cards: currentCards } = get();
            const resetCards = currentCards.map((c) =>
              c.id === first.id || c.id === second.id ? { ...c, isFlipped: false } : c
            );
            set({ cards: resetCards });
          }, 1000);
        }
      }
    },

    resetGame: () => {
      const { difficulty, theme } = get();
      const cards = generateCards(difficulty.pairs * 2, theme.items);
      set({
        cards,
        timeElapsed: 0,
        moves: 0,
        matchedPairs: 0,
        totalPairs: difficulty.pairs,
        isPlaying: false,
        isGameOver: false,
        isCelebrationOpen: false,
      });
    },

    setDifficulty: (difficulty) => {
      set({ difficulty });
      // Re-initialize game with new difficulty
      const { theme } = get();
      const cards = generateCards(difficulty.pairs * 2, theme.items);
      set({
        cards,
        timeElapsed: 0,
        moves: 0,
        matchedPairs: 0,
        totalPairs: difficulty.pairs,
        isPlaying: false,
        isGameOver: false,
        isCelebrationOpen: false,
      });
    },

    setTheme: (themeId) => {
      const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
      const { difficulty } = get();
      const cards = generateCards(difficulty.pairs * 2, theme.items);
      set({
        theme,
        cards,
        timeElapsed: 0,
        moves: 0,
        matchedPairs: 0,
        isPlaying: false,
        isGameOver: false,
        isCelebrationOpen: false,
      });
    },

    togglePreview: () => {
      set((state) => ({ isPreviewEnabled: !state.isPreviewEnabled }));
    },

    closeCelebration: () => {
      set({ isCelebrationOpen: false });
    },

    startTimer: () => {
      // Logic handled by component interval, but we ensure state is ready
    },

    stopTimer: () => {
      // Logic handled by component
    },

    tickTimer: () => {
      set((state) => ({ timeElapsed: state.timeElapsed + 1 }));
    },

    incrementMoves: () => {
      set((state) => ({ moves: state.moves + 1 }));
    }
  };
});
