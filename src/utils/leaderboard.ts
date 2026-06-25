export interface LeaderboardEntry {
  difficulty: number; // 4, 6, or 8 (grid size)
  moves: number;
  time: number; // in seconds
  date: string;
}

const STORAGE_KEY = 'memory-game-leaderboard';

export const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to parse leaderboard from localStorage', error);
    return [];
  }
};

export const saveScore = (difficulty: number, moves: number, time: number): void => {
  const currentLeaderboard = getLeaderboard();
  const newEntry: LeaderboardEntry = {
    difficulty,
    moves,
    time,
    date: new Date().toISOString(),
  };

  const updatedLeaderboard = [...currentLeaderboard, newEntry];
  
  // Sort by difficulty (asc), then time (asc), then moves (asc)
  updatedLeaderboard.sort((a, b) => {
    if (a.difficulty !== b.difficulty) return a.difficulty - b.difficulty;
    if (a.time !== b.time) return a.time - b.time;
    return a.moves - b.moves;
  });

  // Keep top 10 per difficulty
  const limitedLeaderboard = updatedLeaderboard.filter((entry, index, self) => {
    const count = self.filter((e) => e.difficulty === entry.difficulty).length;
    const firstIndex = self.findIndex((e) => e.difficulty === entry.difficulty);
    return index >= firstIndex && index < firstIndex + 10;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedLeaderboard));
  } catch (error) {
    console.error('Failed to save leaderboard to localStorage', error);
  }
};

export const getBestScore = (difficulty: number): LeaderboardEntry | null => {
  const leaderboard = getLeaderboard();
  const filtered = leaderboard.filter((entry) => entry.difficulty === difficulty);
  return filtered.length > 0 ? filtered[0] : null;
};

export const clearLeaderboard = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear leaderboard', error);
  }
};

// Aliases used by gameStore
export const getBestScores = (): Record<string, number> => {
  const leaderboard = getLeaderboard();
  const best: Record<string, number> = {};
  for (const entry of leaderboard) {
    const key = `${entry.difficulty}`;
    if (!best[key] || entry.moves < best[key]) {
      best[key] = entry.moves;
    }
  }
  return best;
};

export const setBestScores = (scores: Record<string, number>): void => {
  // scores is a map of difficulty -> moves, we don't need to do anything
  // since saveScore handles persistence
};
