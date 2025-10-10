import api from './api.js';

export async function listUsers() {
  const { data } = await api.get('/admin/users');
  return data;
}

export async function listAllPickups() {
  const { data } = await api.get('/admin/pickups');
  return data;
}

export async function liveStats() {
  const { data } = await api.get('/admin/stats/live');
  return data;
}
