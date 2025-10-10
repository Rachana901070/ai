import React from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';

export function MapView({ center, markers = [], radiusKm = 10, height = 360 }) {
  const mapCenter = center || { lat: 12.9716, lng: 77.5946 };
  const tileUrl = import.meta.env.VITE_MAP_TILE_URL || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const attribution = import.meta.env.VITE_MAP_ATTRIBUTION || '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <div style={{ height }} className="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
      <MapContainer center={mapCenter} zoom={13} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
        <TileLayer url={tileUrl} attribution={attribution} />
        {center && (
          <Circle center={center} radius={radiusKm * 1000} pathOptions={{ color: '#10b981' }} />
        )}
        {markers.map((m, i) => (
          <Marker key={i} position={{ lat: m.lat, lng: m.lng }}>
            {m.label && <Popup>{m.label}</Popup>}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
