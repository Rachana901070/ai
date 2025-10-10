import { create } from 'zustand';

const themeKey = 'md_theme';

export const useUiStore = create((set) => ({
  theme: typeof window !== 'undefined' ? (localStorage.getItem(themeKey) || 'light') : 'light',
  setTheme: (theme) => {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(themeKey, theme);
    set({ theme });
  },
}));
