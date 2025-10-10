import api from './api.js';
import { useAuthStore } from '../stores/auth.js';

export async function loginApi({ email, password }) {
  const { data } = await api.post('/auth/login', { email, password });
  return data; // { token, user }
}

export async function me() {
  const { data } = await api.get('/auth/me');
  return data; // { id, name, role, ... }
}

export async function loginAction({ email, password }) {
  const resp = await loginApi({ email, password });
  useAuthStore.getState().setToken(resp.token);
  useAuthStore.getState().setUser(resp.user);
  return resp.user;
}
