import { ThemeConfig } from '../types';

export const THEMES: ThemeConfig[] = [
  {
    id: 'animals',
    name: 'Animals',
    emoji: '🦁',
    items: [
      '🦁', '🐯', '🐻', '🐨', '🐼', '🐸', '🐵', '🦊',
      '🐷', '🐮', '🐹', '🐰', '🦄', '🐝', '🦋', '🐞'
    ]
  },
  {
    id: 'flags',
    name: 'Flags',
    emoji: '🌍',
    items: [
      '🇺🇸', '🇬🇧', '🇫🇷', '🇩🇪', '🇯🇵', '🇨🇳', '🇮🇳', '🇧🇷',
      '🇦🇺', '🇨🇦', '🇮🇹', '🇪🇸', '🇰🇷', '🇷🇺', '🇿🇦', '🇲🇽'
    ]
  },
  {
    id: 'emojis',
    name: 'Emojis',
    emoji: '😀',
    items: [
      '😀', '😎', '🤩', '🥳', '🤯', '🥶', '🤠', '👻',
      '👽', '🤖', '💀', '👻', '🎃', '🎈', '🎁', '🎉'
    ]
  }
];

export const getThemeById = (id: string): ThemeConfig => {
  const theme = THEMES.find((t) => t.id === id);
  if (!theme) {
    throw new Error(`Theme with id "${id}" not found`);
  }
  return theme;
};
