export type ThemeId = 'animals' | 'flags' | 'emojis';

export interface CardTheme {
  id: ThemeId;
  name: string;
  description: string;
  emoji: string;
  items: string[];
}

export const THEMES: CardTheme[] = [
  {
    id: 'animals',
    name: 'Animals',
    description: 'Wild and cute creatures from around the world.',
    emoji: '🦁',
    items: [
      '🦁', '🐯', '🐻', '🐨', '🐼', '🐸', '🐵', '🦊',
      '🐷', '🐮', '🐹', '🐰', '🦄', '🐝', '🦋', '🐞'
    ]
  },
  {
    id: 'flags',
    name: 'Flags',
    description: 'Colors and symbols from different nations.',
    emoji: '🌍',
    items: [
      '🇺🇸', '🇬🇧', '🇫🇷', '🇩🇪', '🇯🇵', '🇨🇳', '🇮🇳', '🇧🇷',
      '🇦🇺', '🇨🇦', '🇮🇹', '🇪🇸', '🇰🇷', '🇷🇺', '🇿🇦', '🇲🇽'
    ]
  },
  {
    id: 'emojis',
    name: 'Emojis',
    description: 'Fun expressions and objects for everyone.',
    emoji: '😀',
    items: [
      '😀', '😎', '🤩', '🥳', '🤯', '🥶', '🤠', '👻',
      '👽', '🤖', '💀', '👻', '🎃', '🎈', '🎁', '🎉'
    ]
  }
];

export const getThemeById = (id: ThemeId): CardTheme => {
  const theme = THEMES.find((t) => t.id === id);
  if (!theme) {
    throw new Error(`Theme with id "${id}" not found`);
  }
  return theme;
};

export const getThemeItems = (themeId: ThemeId): string[] => {
  return getThemeById(themeId).items;
};
