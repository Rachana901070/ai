import api from '../lib/api';

export async function createDonation(payload) {
  const { data } = await api.post('/donations', payload);
  return data; // donation
}

export async function getDonation(id) {
  const { data } = await api.get(`/donations/${id}`);
  return data;
}

export async function listNearby(lat, lng, km = 10) {
  const { data } = await api.get('/donations', { params: { near: `${lat},${lng}`, km } });
  return data;
}

export async function updateStatus(id, status) {
  const { data } = await api.patch(`/donations/${id}/status`, { status });
  return data;
}
