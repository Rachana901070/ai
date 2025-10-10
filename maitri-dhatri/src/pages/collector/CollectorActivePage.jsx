import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { setPickupStatus, listNearbyRequests } from '../../services/matches.js';
import { Button } from '../../ui/Button.jsx';
import { uploadToCloudinary } from '../../services/uploads.js';

export function CollectorActivePage() {
  const { data } = useQuery({ queryKey: ['active-pickups'], queryFn: () => listNearbyRequests({ status: 'accepted' }) });

  const start = useMutation({ mutationFn: (id) => setPickupStatus(id, 'started') });
  const complete = useMutation({ mutationFn: (id) => setPickupStatus(id, 'completed') });

  async function onUploadProof(pickupId, e) {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadToCloudinary(file);
    await setPickupStatus(pickupId, 'proof_uploaded');
  }

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Active Pickups</h1>
      {data?.length ? data.map((p) => (
        <div key={p.id} className="rounded border p-3 dark:border-gray-700">
          <div className="text-sm text-gray-600">{p.type} • {p.qty}</div>
          <div className="mt-2 flex items-center gap-2">
            <Button disabled={start.isPending} onClick={() => start.mutate(p.id)}>Start</Button>
            <Button disabled={complete.isPending} onClick={() => complete.mutate(p.id)}>Complete</Button>
            <input type="file" accept="image/*" onChange={(e) => onUploadProof(p.id, e)} />
          </div>
        </div>
      )) : (<div>No active pickups</div>)}
    </div>
  );
}
