import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card.jsx';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button.jsx';

export function HomePage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="font-semibold">Donors</CardHeader>
        <CardContent>
          <p className="mb-3 text-sm text-gray-600">Post surplus food to nearby collectors.</p>
          <div className="flex gap-2">
            <Link to="/auth/login"><Button>Login</Button></Link>
            <Link to="/donor/dashboard"><Button variant="outline">Dashboard</Button></Link>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="font-semibold">Collectors</CardHeader>
        <CardContent>
          <p className="mb-3 text-sm text-gray-600">Accept requests and manage pickups.</p>
          <div className="flex gap-2">
            <Link to="/auth/login"><Button>Login</Button></Link>
            <Link to="/collector/requests"><Button variant="outline">View Requests</Button></Link>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="font-semibold">Admin</CardHeader>
        <CardContent>
          <p className="mb-3 text-sm text-gray-600">Monitor operations across the city.</p>
          <div className="flex gap-2">
            <Link to="/auth/login"><Button>Login</Button></Link>
            <Link to="/admin/map"><Button variant="outline">Live Map</Button></Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
