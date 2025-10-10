import React, { useMemo } from 'react';
import { ClusterMap } from '../../components/ClusterMap.jsx';
import { useQuery } from '@tanstack/react-query';
import { listAllPickups } from '../../services/admin.js';

export function AdminMapPage() {
  const { data, isLoading } = useQuery({ queryKey: ['admin-pickups'], queryFn: listAllPickups, refetchInterval: 5000 });
  const markers = useMemo(() => (data || []).map((p) => ({ lat: p.location?.lat, lng: p.location?.lng, label: `${p.status} • ${p.type}` })), [data]);
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Live Map</h1>
      {isLoading ? 'Loading...' : <ClusterMap points={markers} />}
    </div>
  );
}
