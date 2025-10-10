import api from '../lib/api';

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  return data; // { token, user }
}

export async function fetchMe() {
  const { data } = await api.get('/me');
  return data; // user
}
