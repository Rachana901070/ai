import React, { useEffect, useState } from 'react';
import * as admin from '../../services/admin';

export default function Analytics(){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ admin.getAnalytics().then(setData).catch((e)=>alert(e.message)).finally(()=>setLoading(false)); },[]);

  if (loading) return <div className="spinner" />;
  if (!data) return <div className="empty">No data</div>;

  return (
    <section className="container">
      <h2>Analytics</h2>
      <div className="row wrap">
        <div className="card"><h3 style={{marginTop:0}}>Total Donations</h3><p style={{fontSize:24,fontWeight:700}}>{data.totalDonations ?? '-'}</p></div>
        <div className="card"><h3 style={{marginTop:0}}>Completed Pickups</h3><p style={{fontSize:24,fontWeight:700}}>{data.completedPickups ?? '-'}</p></div>
        <div className="card"><h3 style={{marginTop:0}}>Active Matches</h3><p style={{fontSize:24,fontWeight:700}}>{data.activeMatches ?? '-'}</p></div>
      </div>
    </section>
  );
}
