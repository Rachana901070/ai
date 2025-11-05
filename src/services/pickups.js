import api from '../lib/api';

export async function startPickup(matchId) {
  const { data } = await api.post(`/pickups/${matchId}/start`);
  return data;
}

export async function completePickup(matchId, proofImagePath) {
  const { data } = await api.post(`/pickups/${matchId}/complete`, { proofImagePath });
  return data;
}
