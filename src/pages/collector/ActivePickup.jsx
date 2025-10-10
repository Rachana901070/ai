import React, { useState } from 'react';
import * as pickups from '../../services/pickups';
import ImageUploader from '../../components/ImageUploader.jsx';

export default function ActivePickup(){
  const [matchId, setMatchId] = useState('');
  const [proofPaths, setProofPaths] = useState([]);
  const [loading, setLoading] = useState(false);

  const start = async () => {
    if (!matchId) return;
    setLoading(true);
    try { await pickups.startPickup(matchId); alert('Pickup started'); }
    catch(e){ alert(e.message); }
    finally{ setLoading(false); }
  };

  const complete = async () => {
    if (!matchId) return;
    setLoading(true);
    try { await pickups.completePickup(matchId, proofPaths[0]); alert('Pickup completed'); }
    catch(e){ alert(e.message); }
    finally{ setLoading(false); }
  };

  return (
    <section className="container">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Active Pickup</h2>
        <div className="form-field">
          <label htmlFor="matchId">Match ID</label>
          <input id="matchId" value={matchId} onChange={(e)=>setMatchId(e.target.value)} placeholder="Enter match ID" />
        </div>
        <div className="row">
          <button onClick={start} disabled={loading}>Start</button>
          <button onClick={complete} disabled={loading || !proofPaths.length}>Complete</button>
        </div>
        <div className="form-field">
          <label>Proof Image</label>
          <ImageUploader onUploaded={setProofPaths} />
        </div>
      </div>
    </section>
  );
}
