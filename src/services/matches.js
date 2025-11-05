import api from '../lib/api';

export async function autoMatch(donationId) {
  const { data } = await api.post(`/matches/${donationId}/auto`);
  return data; // match or result
}

export async function acceptMatch(id) {
  const { data } = await api.post(`/matches/${id}/accept`);
  return data;
}

export async function rejectMatch(id) {
  const { data } = await api.post(`/matches/${id}/reject`);
  return data;
}
