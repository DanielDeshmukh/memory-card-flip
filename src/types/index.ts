export interface Card {
  id: string;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export type GameStatus = 'idle' | 'playing' | 'completed';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  label: string;
  rows: number;
  cols: number;
  pairs: number;
}

export interface ThemeConfig {
  id: string;
  name: string;
  emoji: string;
  items: string[];
}

export interface GameState {
  cards: Card[];
  difficulty: DifficultyConfig;
  theme: ThemeConfig;
  timeElapsed: number;
  moves: number;
  matchedPairs: number;
  totalPairs: number;
  isPlaying: boolean;
  isGameOver: boolean;
  isPreviewEnabled: boolean;
  isCelebrationOpen: boolean;
  bestScores: Record<string, number>;
}

export interface GameStats {
  timeElapsed: number;
  matchedPairs: number;
  totalPairs: number;
}

export interface GameConfig {
  difficulty: Difficulty;
  pairs: number;
}
