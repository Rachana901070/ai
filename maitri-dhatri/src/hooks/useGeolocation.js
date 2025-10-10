import { useEffect } from 'react';
import { useGeoStore } from '../stores/geo.js';

export function useGeolocation() {
  const myLocation = useGeoStore((s) => s.myLocation);
  const setMyLocation = useGeoStore((s) => s.setMyLocation);

  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setMyLocation({ lat: latitude, lng: longitude, accuracy });
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [setMyLocation]);

  return { myLocation };
}
