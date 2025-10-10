import api from './api.js';

export async function listNearbyRequests(params) {
  const { data } = await api.get('/pickups', { params });
  return data;
}

export async function acceptRequest(pickupId) {
  const { data } = await api.post('/pickups/accept', { pickupId });
  return data;
}

export async function setPickupStatus(pickupId, status) {
  const { data } = await api.patch(`/pickups/${pickupId}/status`, { status });
  return data;
}
