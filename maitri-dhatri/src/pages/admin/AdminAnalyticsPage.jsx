import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { liveStats } from '../../services/admin.js';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];

export function AdminAnalyticsPage() {
  const { data } = useQuery({ queryKey: ['live-stats'], queryFn: liveStats, refetchInterval: 10000 });

  const lineData = data?.timeline || [
    { name: '09:00', pickups: 3 },
    { name: '10:00', pickups: 5 },
    { name: '11:00', pickups: 7 },
  ];

  const pieData = data?.statusBreakdown || [
    { name: 'Pending', value: 4 },
    { name: 'Accepted', value: 6 },
    { name: 'Started', value: 3 },
    { name: 'Completed', value: 2 },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <CartesianGrid stroke="#efefef" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="pickups" stroke="#10b981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
