import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getDonation } from '../../services/donations.js';
import { Card, CardContent, CardHeader } from '../../ui/Card.jsx';

export function DonationDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({ queryKey: ['donation', id], queryFn: () => getDonation(id) });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  const timeline = data.timeline || [
    { ts: data.createdAt || new Date().toISOString(), label: 'Created' },
    { ts: data.assignedAt, label: 'Collector assigned' },
    { ts: data.pickedAt, label: 'Picked up' },
    { ts: data.completedAt, label: 'Completed' },
  ].filter(Boolean);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="font-semibold">Donation #{data.id}</CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600">{data.type} • {data.qty} units • {data.cooked ? 'Cooked' : 'Uncooked'}</div>
          {data.photos?.length ? (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {data.photos.map((src, i) => (
                <img key={i} className="h-24 w-full rounded object-cover" src={src} alt="photo" />
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="font-semibold">Timeline</CardHeader>
        <CardContent>
          <ol className="relative ml-4 border-l border-gray-300 pl-4 dark:border-gray-700">
            {timeline.map((t, i) => (
              <li key={i} className="mb-4">
                <div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-primary-500" />
                <div className="text-sm">{t.label}</div>
                <div className="text-xs text-gray-500">{new Date(t.ts).toLocaleString()}</div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
