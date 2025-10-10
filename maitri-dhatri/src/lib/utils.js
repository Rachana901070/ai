export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function haversineKm(a, b) {
  if (!a || !b) return null;
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * c;
}

export function etaFromKm(distanceKm, speedKmh = 30) {
  if (!distanceKm) return null;
  const hours = distanceKm / speedKmh;
  const minutes = Math.round(hours * 60);
  return minutes;
}
