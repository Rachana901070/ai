import React, { useEffect, useState } from 'react';
import { getCurrentPosition } from '../../lib/geo';
import * as donations from '../../services/donations';
import * as matches from '../../services/matches';
import EmptyState from '../../components/EmptyState.jsx';

export default function Requests(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const { lat, lng } = await getCurrentPosition();
      const data = await donations.listNearby(lat, lng, 10);
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      alert(e.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const onAccept = async (id) => {
    try {
      await matches.acceptMatch(id);
      refresh();
    } catch (e) { alert(e.message); }
  };
  const onReject = async (id) => {
    try {
      await matches.rejectMatch(id);
      refresh();
    } catch (e) { alert(e.message); }
  };

  return (
    <section className="container">
      <h2>Nearby Donations</h2>
      {loading ? <div className="spinner" /> : (
        items.length ? (
          <div className="row wrap">
            {items.map((d)=> (
              <div key={d.id || d._id} className="card" style={{ flex: '1 1 300px' }}>
                <h3 style={{ marginTop: 0 }}>{d.meta?.type} {d.meta?.cooked ? '(Cooked)' : ''}</h3>
                <p>Qty: {d.meta?.qtyEstimate}</p>
                <div className="row">
                  <button onClick={()=>onAccept(d.matchId || d.id)}>Accept</button>
                  <button onClick={()=>onReject(d.matchId || d.id)}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        ) : <EmptyState title="No nearby donations" />
      )}
    </section>
  );
}
