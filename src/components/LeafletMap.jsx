import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function LeafletMap({ center = [0, 0], zoom = 13, markers = [] }) {
  const tileUrl = import.meta.env.VITE_MAP_TILE_URL;
  const attribution = import.meta.env.VITE_MAP_ATTRIBUTION;

  if (!tileUrl) return null;

  return (
    <div style={{ height: 360, width: '100%', borderRadius: 12, overflow: 'hidden' }}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer url={tileUrl} attribution={attribution} />
        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng]}>
            {m.label && <Popup>{m.label}</Popup>}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
