import { Difficulty, DifficultyConfig } from '../types';

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: { label: 'Easy', rows: 4, cols: 4, pairs: 8 },
  medium: { label: 'Medium', rows: 4, cols: 6, pairs: 12 },
  hard: { label: 'Hard', rows: 6, cols: 6, pairs: 18 },
};

export const CARD_COLORS = ['#76b900', '#5a8e00', '#99c22e', '#4a7a00', '#87aa1e', '#6b9d1a'];

export const GAME_COLORS = {
  background: '#000000',
  accent: '#76b900',
  text: '#ffffff',
  cardBack: '#1a1a1a',
  cardFront: '#0f0f0f',
  border: '#76b900',
};

export const GAME_DURATION = 180; // default in seconds

export const GAME_ID_PREFIX = 'card-';
