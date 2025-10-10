import { useEffect } from 'react';
import { useAuthStore } from '../stores/auth.js';
import { me } from '../services/auth.js';

export function useAuth() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (token && !user) {
        try {
          const profile = await me();
          if (!cancelled) setUser(profile);
        } catch (e) {
          // ignore
        }
      }
    }
    load();
    return () => { cancelled = true; };
  }, [token, user, setUser]);

  return {
    token,
    user,
    isAuthenticated: Boolean(token),
  };
}
