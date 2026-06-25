Project: Fix the Memory Card Flip game at D:\projects\memory-card-flip. The project builds but has critical bugs: 1) Timer shows NaN:NaN - the timeElapsed state is undefined, gameStore uses 'timer' but StatsBar reads 'timeElapsed' 2) No card grid renders - GameGrid component likely broken 3) No Tailwind CSS styling applies - postcss.config.js was missing (now added), but vite.config.ts may need PostCSS plugin 4) Matched count shows 'Matched / pairs' with no numbers 5) The project must use the NVIDIA dark theme from DESIGN.md in this project root - black canvas (#000000), NVIDIA green (#76b900) accent, angular 2px radius, no gradients. Read DESIGN.md first. Fix ALL bugs and apply NVIDIA theme. Make it actually work and look polished.

Files being built:
1. index.html, package.json, src/main.tsx, src/index.css, tsconfig.json
2. src/store/gameStore.ts, src/components/StatsBar.tsx
3. src/components/GameGrid.tsx, src/components/Card.tsx
4. vite.config.ts
5. src/styles/globals.css, src/components/App.tsx
6. src/store/gameStore.test.ts
7. src/types/index.ts, src/constants/index.ts

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