import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';

function MarkerClusterLayer({ points }) {
  const map = useMap();
  useEffect(() => {
    const cluster = L.markerClusterGroup();
    const items = (points || []).filter(p => p.lat && p.lng).map((p) => {
      const marker = L.marker([p.lat, p.lng]);
      if (p.label) marker.bindPopup(p.label);
      return marker;
    });
    items.forEach(m => cluster.addLayer(m));
    map.addLayer(cluster);
    return () => {
      map.removeLayer(cluster);
      cluster.clearLayers();
    };
  }, [map, points]);
  return null;
}

export function ClusterMap({ center = { lat: 12.9716, lng: 77.5946 }, zoom = 12, points = [], height = 480 }) {
  const tileUrl = import.meta.env.VITE_MAP_TILE_URL || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const attribution = import.meta.env.VITE_MAP_ATTRIBUTION || '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  return (
    <div style={{ height }} className="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
        <TileLayer url={tileUrl} attribution={attribution} />
        <MarkerClusterLayer points={points} />
      </MapContainer>
    </div>
  );
}
