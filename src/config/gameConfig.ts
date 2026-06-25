export const GAME_CONFIG = {
  // Animation Durations (in milliseconds)
  ANIMATION_DURATION: 600,
  FLIP_DURATION: 500,
  CELEBRATION_DURATION: 2000,
  CARD_PREVIEW_DURATION: 1500,

  // Time Intervals (in milliseconds)
  TIMER_INTERVAL: 1000,
  MATCH_DELAY: 800,
  MISMATCH_DELAY: 1200,

  // Grid Sizes
  DIFFICULTY_LEVELS: {
    EASY: { rows: 4, cols: 4, totalPairs: 8 },
    MEDIUM: { rows: 6, cols: 6, totalPairs: 18 },
    HARD: { rows: 8, cols: 8, totalPairs: 32 },
  },

  // Theme Limits
  MAX_THEMES: 3,
  THEME_NAMES: ['animals', 'flags', 'emojis'] as const,

  // Card Preview
  ENABLE_CARD_PREVIEW: true,

  // Leaderboard
  LEADERBOARD_LIMIT: 10,

  // Progress Bar
  PROGRESS_BAR_STEPS: 100,

  // Colors for themes (optional fallback)
  THEME_COLORS: {
    animals: '#3b82f6',
    flags: '#10b981',
    emojis: '#f59e0b',
  },

  // Card dimensions
  CARD_SIZE: 80,
  CARD_GAP: 12,

  // Game limits
  MAX_MOVES: 1000,
};

export type GameDifficulty = keyof typeof GAME_CONFIG.DIFFICULTY_LEVELS;
export type ThemeName = typeof GAME_CONFIG.THEME_NAMES[number];

export const getGridSize = (difficulty: GameDifficulty) => {
  return GAME_CONFIG.DIFFICULTY_LEVELS[difficulty];
};