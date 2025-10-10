import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { listMyDonations } from '../../services/donations.js';
import { Link } from 'react-router-dom';
import { Button } from '../../ui/Button.jsx';
import { Card, CardContent, CardHeader } from '../../ui/Card.jsx';

export function DonorDashboard() {
  const { data, isLoading } = useQuery({ queryKey: ['my-donations'], queryFn: listMyDonations });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">My Donations</h1>
        <Link to="/donor/new"><Button>New Donation</Button></Link>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {data?.map((d) => (
            <Card key={d.id}>
              <CardHeader className="font-medium">{d.type} • {d.qty} units</CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">Status: {d.status}</div>
                <Link to={`/donor/donations/${d.id}`}><Button variant="outline" className="mt-2">View</Button></Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
