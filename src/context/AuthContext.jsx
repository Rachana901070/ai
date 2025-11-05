import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { setToken as setStoredToken, getToken as getStoredToken, clearToken as clearStoredToken } from '../lib/storage';
import * as authService from '../services/auth';
import { ROLES } from '../lib/constants';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    authService
      .fetchMe()
      .then((u) => setUser(u))
      .catch(() => {
        setToken(null);
        clearStoredToken();
      })
      .finally(() => setLoading(false));
  }, [token]);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    setStoredToken(res.token);
    setToken(res.token);
    setUser(res.user);
    return res.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearStoredToken();
  };

  const fetchMe = async () => {
    const u = await authService.fetchMe();
    setUser(u);
    return u;
  };

  const value = useMemo(() => ({ token, user, loading, login, logout, fetchMe, ROLES }), [token, user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
