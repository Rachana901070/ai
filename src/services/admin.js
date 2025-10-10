import api from '../lib/api';

export async function getAnalytics() {
  const { data } = await api.get('/admin/analytics');
  return data;
}

export async function getUsers() {
  const { data } = await api.get('/admin/users');
  return data;
}
