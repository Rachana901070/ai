import React, { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listNearbyRequests, acceptRequest } from '../../services/matches.js';
import { MapView } from '../../components/MapView.jsx';
import { useGeolocation } from '../../hooks/useGeolocation.js';
import { Button } from '../../ui/Button.jsx';
import { Card, CardContent, CardHeader } from '../../ui/Card.jsx';
import { haversineKm, etaFromKm } from '../../lib/utils.js';

export function CollectorRequestsPage() {
  const { myLocation } = useGeolocation();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['nearby-requests'], queryFn: () => listNearbyRequests({}) });

  const { mutate, isPending } = useMutation({
    mutationFn: (id) => acceptRequest(id),
    // optimistic update
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['nearby-requests'] });
      const previous = queryClient.getQueryData(['nearby-requests']);
      queryClient.setQueryData(['nearby-requests'], (old) => old?.filter((r) => r.id !== id));
      return { previous };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(['nearby-requests'], ctx.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['nearby-requests'] }),
  });

  const markers = useMemo(() => (data || []).map((r) => ({ lat: r.location?.lat, lng: r.location?.lng, label: `${r.type} (${r.qty})` })), [data]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h1 className="mb-3 text-xl font-semibold">Nearby Requests</h1>
        {isLoading ? 'Loading...' : (
          <div className="space-y-3">
            {data?.map((r) => {
              const dist = haversineKm(myLocation, r.location);
              const eta = etaFromKm(dist);
              return (
                <Card key={r.id}>
                  <CardHeader className="font-medium">{r.type} • {r.qty}</CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">{dist ? `${dist.toFixed(1)} km` : 'Unknown distance'} {eta ? `• ETA ${eta} min` : ''}</div>
                    <Button disabled={isPending} className="mt-2" onClick={() => mutate(r.id)}>Accept</Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
      <div>
        <MapView center={myLocation} markers={markers} />
      </div>
    </div>
  );
}
