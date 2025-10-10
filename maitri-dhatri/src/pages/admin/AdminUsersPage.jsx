import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { listUsers } from '../../services/admin.js';

export function AdminUsersPage() {
  const { data, isLoading } = useQuery({ queryKey: ['admin-users'], queryFn: listUsers });
  if (isLoading) return 'Loading...';
  return (
    <div>
      <h1 className="mb-3 text-xl font-semibold">Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="px-2 py-2 text-left">ID</th>
              <th className="px-2 py-2 text-left">Name</th>
              <th className="px-2 py-2 text-left">Email</th>
              <th className="px-2 py-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((u) => (
              <tr key={u.id} className="border-b dark:border-gray-800">
                <td className="px-2 py-2">{u.id}</td>
                <td className="px-2 py-2">{u.name}</td>
                <td className="px-2 py-2">{u.email}</td>
                <td className="px-2 py-2">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
