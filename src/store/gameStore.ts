import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme, Difficulty } from '../data/themes';
import { getBestScores, setBestScores } from '../utils/leaderboard';

export interface GameCard {
  id: string;
  front: string;
  back: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: GameCard[];
  moves: number;
  timer: number;
  isPlaying: boolean;
  difficulty: Difficulty;
  theme: Theme;
  bestScores: Record<string, number>;
  isPreviewEnabled: boolean;
  isCelebrationOpen: boolean;
}

export interface GameActions {
  startGame: () => void;
  flipCard: (id: string) => void;
  matchCards: (id1: string, id2: string) => void;
  hideCards: () => void;
  incrementMoves: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setTheme: (theme: Theme) => void;
  openCelebration: () => void;
  closeCelebration: () => void;
  enablePreview: () => void;
  disablePreview: () => void;
}

export type GameStore = GameState & GameActions;

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      cards: [],
      moves: 0,
      timer: 0,
      isPlaying: false,
      difficulty: { label: 'Easy', rows: 4, cols: 4 },
      theme: { id: 'animals', name: 'Animals', cards: [] },
      bestScores: getBestScores(),
      isPreviewEnabled: true,
      isCelebrationOpen: false,

      startGame: () => {
        const { difficulty, theme } = get();
        const totalPairs = (difficulty.rows * difficulty.cols) / 2;
        const cardData = theme.cards.slice(0, totalPairs);
        
        // Create pairs of cards
        const cards = cardData.flatMap(card => [
          { id: `${card.id}-1`, front: card.front, back: card.back, isFlipped: false, isMatched: false },
          { id: `${card.id}-2`, front: card.front, back: card.back, isFlipped: false, isMatched: false }
        ]);
        
        // Shuffle cards using Fisher-Yates algorithm
        for (let i = cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        
        set({
          cards,
          moves: 0,
          timer: 0,
          isPlaying: true,
          isCelebrationOpen: false
        });
        
        // Start timer
        setTimeout(() => {
          if (get().isPlaying) {
            set({ timer: 1 });
            const interval = setInterval(() => {
              set(state => ({ timer: state.timer + 1 }));
            }, 1000);
            
            // Store interval ID in state for cleanup
            // Note: Zustand doesn't natively support storing intervals, so we'll handle cleanup in component
          }
        }, 100);
      },

      flipCard: (id: string) => {
        const { cards, isPlaying } = get();
        if (!isPlaying) return;
        
        const cardIndex = cards.findIndex(card => card.id === id);
        if (cardIndex === -1 || cards[cardIndex].isFlipped || cards[cardIndex].isMatched) return;
        
        // Create a copy of cards
        const newCards = [...cards];
        newCards[cardIndex].isFlipped = true;
        
        // Check if we have two flipped cards
        const flippedCards = newCards.filter(card => card.isFlipped && !card.isMatched);
        
        if (flippedCards.length === 2) {
          // Check for match
          const [first, second] = flippedCards;
          if (first.front === second.front) {
            // Match found
            set({ cards: newCards });
            setTimeout(() => {
              const updatedCards = newCards.map(card =>
                card.id === first.id || card.id === second.id
                  ? { ...card, isMatched: true }
                  : card
              );
              set({ cards: updatedCards });
              
              // Check if all cards are matched
              const allMatched = updatedCards.every(card => card.isMatched);
              if (allMatched) {
                get().stopTimer();
                get().openCelebration();
                
                // Update best score
                const { difficulty, moves, timer, bestScores } = get();
                const difficultyKey = `${difficulty.rows}x${difficulty.cols}-${difficulty.label.toLowerCase()}`;
                const currentBest = bestScores[difficultyKey] || Infinity;
                if (moves < currentBest) {
                  const newBestScores = { ...bestScores, [difficultyKey]: moves };
                  set({ bestScores: newBestScores });
                  setBestScores(newBestScores);
                }
              }
            }, 500);
          } else {
            // No match, hide after delay
            set({ cards: newCards });
            setTimeout(() => {
              const hiddenCards = newCards.map(card =>
                card.isFlipped && !card.isMatched ? { ...card, isFlipped: false } : card
              );
              set({ cards: hiddenCards });
            }, 1000);
          }
        } else {
          // Only one card flipped, update state
          set({ cards: newCards });
        }
      },

      matchCards: (id1: string, id2: string) => {
        const { cards } = get();
        const newCards = cards.map(card =>
          card.id === id1 || card.id === id2
            ? { ...card, isMatched: true }
            : card
        );
        set({ cards: newCards });
      },

      hideCards: () => {
        const { cards } = get();
        const hiddenCards = cards.map(card =>
          card.isFlipped && !card.isMatched ? { ...card, isFlipped: false } : card
        );
        set({ cards: hiddenCards });
      },

      incrementMoves: () => {
        set(state => ({ moves: state.moves + 1 }));
      },

      startTimer: () => {
        set({ isPlaying: true });
        const interval = setInterval(() => {
          set(state => ({ timer: state.timer + 1 }));
        }, 1000);
        
        // Store interval ID for cleanup
        // Note: Zustand doesn't natively support storing intervals, so we'll handle cleanup in component
      },

      stopTimer: () => {
        set({ isPlaying: false });
      },

      setDifficulty: (difficulty: Difficulty) => {
        set({ difficulty });
        // Reset game when difficulty changes
        get().startGame();
      },

      setTheme: (theme: Theme) => {
        set({ theme });
        // Reset game when theme changes
        get().startGame();
      },

      openCelebration: () => {
        set({ isCelebrationOpen: true });
      },

      closeCelebration: () => {
        set({ isCelebrationOpen: false });
      },

      enablePreview: () => {
        set({ isPreviewEnabled: true });
      },

      disablePreview: () => {
        set({ isPreviewEnabled: false });
      },
    }),
    {
      name: 'memory-game-storage',
      partialize: (state) => ({
        bestScores: state.bestScores,
        difficulty: state.difficulty,
        theme: state.theme,
        isPreviewEnabled: state.isPreviewEnabled
      })
    }
  )
);
