import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function Admin() {
  const [posts, setPosts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [pickups, setPickups] = useState<any[]>([]);
  const [proofs, setProofs] = useState<any[]>([]);
  const [live, setLive] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [posts, users, pickups, proofs, live] = await Promise.all([
          api.get('/admin/posts'),
          api.get('/admin/users'),
          api.get('/admin/pickups'),
          api.get('/admin/proofs'),
          api.get('/admin/stats/live'),
        ]);
        setPosts(posts); setUsers(users); setPickups(pickups); setProofs(proofs); setLive(live);
      } catch {}
    })();
  }, []);

  return (
    <main className="container">
      <h1>Admin Dashboard</h1>
      {live && <div className="grid">
        <div className="card">Meals matched: {live.mealsMatched}</div>
        <div className="card">Donors: {live.donors}</div>
        <div className="card">Collectors: {live.collectors}</div>
      </div>}
      <section>
        <h2>Posts</h2>
        <div className="card"><pre>{JSON.stringify(posts.slice(0,10), null, 2)}</pre></div>
      </section>
      <section>
        <h2>Users</h2>
        <div className="card"><pre>{JSON.stringify(users.slice(0,10), null, 2)}</pre></div>
      </section>
      <section>
        <h2>Pickups</h2>
        <div className="card"><pre>{JSON.stringify(pickups.slice(0,10), null, 2)}</pre></div>
      </section>
      <section>
        <h2>Proofs</h2>
        <div className="card"><pre>{JSON.stringify(proofs.slice(0,10), null, 2)}</pre></div>
      </section>
    </main>
  );
}
