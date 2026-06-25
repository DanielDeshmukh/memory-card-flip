Project: Build a Memory Card Flip game with React 18, Zustand, Framer Motion, and Tailwind CSS. Features: Card flip animation with 3D transforms (perspective, rotateY), multiple themes (animals, flags, emojis) with dynamic card generation, move counter and timer display, best score leaderboard (localStorage), difficulty levels (4x4, 6x6, 8x8 grids), shuffle algorithm (Fisher-Yates) on each game start, flip state machine (idle -> flipping -> matched/hidden), progress bar showing matched pairs, celebration animation on completion, card preview on first 2 moves (beginner-friendly mode). Use a colorful, playful design.

Files being built:
1. index.html, src/main.tsx, vite.config.ts, tsconfig.json
2. package.json, vite.config.js
3. tailwind.config.js, src/index.css
4. src/store/gameStore.ts
5. src/utils/shuffle.ts
6. src/data/themes.ts
7. src/components/Card.tsx, src/components/Card.css
8. src/components/GameGrid.tsx
9. src/components/StatsBar.tsx
10. src/components/ProgressBar.tsx
11. src/utils/leaderboard.ts
12. src/components/ThemeSelector.tsx
13. src/components/DifficultySelector.tsx
14. src/hooks/useCardPreview.ts
15. src/components/Celebration.tsx
16. src/hooks/useFlipState.ts
17. src/App.tsx, src/App.css
18. src/utils/shuffle.test.ts, src/hooks/useFlipState.test.ts
19. src/config/gameConfig.ts

TYPE CONTRACTS (ALL workers must use these exact types):
--- src/types/Todo.ts ---
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}
export type FilterType = 'all' | 'active' | 'completed';

--- src/hooks/useTodos.ts (MUST export these) ---
export function useTodos() {
  return {
    todos: Todo[],           // filtered list based on current filter
    filter: FilterType,
    setFilter: (f: FilterType) => void,
    addTodo: (text: string) => void,         // takes a STRING, not an object
    toggleTodo: (id: string) => void,        // takes string ID
    deleteTodo: (id: string) => void,        // takes string ID
    remainingCount: number,
  };
}

--- Component Prop Contracts (use EXACTLY these signatures) ---
TodoInput: { onAddTodo: (text: string) => void }
TodoItem: { todo: Todo; onToggle: (id: string) => void; onDelete: (id: string) => void }
TodoFilter: { filter: FilterType; setFilter: (f: FilterType) => void }
TodoCounter: { count: number }

DESIGN LANGUAGE (apply to all UI):
- Colors: cohesive palette (blues #3b82f6/#60a5fa/#1e40af, or slates #0f172a/#1e293b/#334155)
- Shadows: 0 4px 6px -1px rgba(0,0,0,0.1) for cards, 0 10px 15px -3px for modals
- Transitions: all 0.2s ease on hover/focus
- Typography: font-weight 600-700 headings, 14-16px body
- Spacing: 16-24px padding, 8-12px gap in flex/grid
- Border-radius: 8-12px for cards, 6px for buttons, 50% for circles
- Gradients: linear-gradient(135deg, start, end) for accents

CODE RULES:
- React functional components with hooks
- Export default for main components
- Import React in files that use JSX
- Import Todo from '../types/Todo' (or '../types') where needed

Return JSON: {"files": [{"path": "...", "content": "..."}]}