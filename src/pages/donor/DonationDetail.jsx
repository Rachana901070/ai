import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as donations from '../../services/donations';
import * as matches from '../../services/matches';
import StatusBadge from '../../components/StatusBadge.jsx';

export default function DonationDetail(){
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [matching, setMatching] = useState(false);

  useEffect(() => {
    donations.getDonation(id).then(setData).catch((e)=>alert(e.message)).finally(()=>setLoading(false));
  }, [id]);

  const onAutoMatch = async () => {
    setMatching(true);
    try {
      await matches.autoMatch(id);
      const updated = await donations.getDonation(id);
      setData(updated);
      alert('Auto match requested');
    } catch (e) {
      alert(e.message || 'Match failed');
    } finally {
      setMatching(false);
    }
  };

  if (loading) return <div className="spinner" />;
  if (!data) return <div className="empty">Not found</div>;

  return (
    <section className="container">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Donation Detail</h2>
        <p>ID: {data.id || data._id}</p>
        <p>Status: <StatusBadge status={data.status} /></p>
        <div className="row wrap">
          <button onClick={onAutoMatch} disabled={matching}>Auto Match</button>
        </div>
      </div>
    </section>
  );
}
