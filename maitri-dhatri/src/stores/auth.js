import { create } from 'zustand';

const tokenKey = 'md_token';

export const useAuthStore = create((set, get) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem(tokenKey) : null,
  user: null,
  setToken: (token) => {
    set({ token });
    if (token) localStorage.setItem(tokenKey, token);
    else localStorage.removeItem(tokenKey);
  },
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem(tokenKey);
    set({ token: null, user: null });
  },
}));
