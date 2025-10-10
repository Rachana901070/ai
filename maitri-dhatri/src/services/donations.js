import api from './api.js';

export async function createDonation(payload) {
  const { data } = await api.post('/posts', payload);
  return data;
}

export async function listMyDonations() {
  const { data } = await api.get('/posts');
  return data;
}

export async function getDonation(id) {
  const { data } = await api.get(`/posts/${id}`);
  return data;
}
