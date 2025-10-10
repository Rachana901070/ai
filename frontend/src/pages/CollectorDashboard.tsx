import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import { haversineDistanceKm } from '../utils/distance';

export default function CollectorDashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  const [pickups, setPickups] = useState<any[]>([]);
  const [geo, setGeo] = useState<{lat:number; lng:number} | null>(null);

  useEffect(() => { navigator.geolocation.getCurrentPosition((pos)=> setGeo({ lat: pos.coords.latitude, lng: pos.coords.longitude })); }, []);
  useEffect(() => { api.get<any[]>('/posts?status=pending').then(setPosts).catch(()=>setPosts([])); }, []);
  useEffect(() => { api.get<any[]>('/pickups').then(setPickups).catch(()=>setPickups([])); }, []);

  const sorted = useMemo(() => {
    if (!geo) return posts;
    return [...posts].sort((a,b)=> (haversineDistanceKm(geo, a.location) - haversineDistanceKm(geo, b.location)));
  }, [geo, posts]);

  const accept = async (postId: string) => {
    const pickup = await api.post('/pickups/accept', { postId });
    setPickups([pickup, ...pickups]);
    setPosts(posts.filter(p=>p._id!==postId));
  };

  const updateStatus = async (pickupId: string, status: string) => {
    const updated = await api.patch(`/pickups/${pickupId}/status`, { status });
    setPickups(pickups.map(p=> p._id===pickupId ? updated : p));
  };

  return (
    <main className="container">
      <h1>Collector Dashboard</h1>
      <section>
        <h2>Nearby Posts</h2>
        <ul className="list">
          {sorted.map(p => (
            <li key={p._id} className="card">
              <div>
                <strong>{p.foodType}</strong> • {p.quantity} • time left: {Math.max(0, Math.round((new Date(p.expiryTime).getTime() - Date.now())/60000))} min
              </div>
              <div>
                {geo && <span>Distance: {haversineDistanceKm(geo, p.location).toFixed(1)} km</span>}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn primary" onClick={()=>accept(p._id)}>Accept Pickup</button>
                <a className="btn" href={`https://www.google.com/maps/dir/?api=1&destination=${p.location.lat},${p.location.lng}`} target="_blank">Route</a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>My Pickups</h2>
        <ul className="list">
          {pickups.map(pk => (
            <li key={pk._id} className="card">
              <div>
                <strong>{pk._id}</strong> • status: {pk.status}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={()=>updateStatus(pk._id,'en_route')}>En Route</button>
                <button onClick={()=>updateStatus(pk._id,'picked_up')}>Picked Up</button>
                <button onClick={()=>updateStatus(pk._id,'delivered')}>Delivered</button>
                <a className="btn" href={`/proof/${pk._id}`}>Submit Proof</a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
