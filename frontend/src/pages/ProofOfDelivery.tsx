import { FormEvent, useState } from 'react';
import { api } from '../api/client';

export default function ProofOfDelivery() {
  const [pickupId, setPickupId] = useState('');
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [video, setVideo] = useState<FileList | null>(null);
  const [signature, setSignature] = useState('');
  const [otp, setOtp] = useState('');
  const [beneficiaries, setBeneficiaries] = useState<number | ''>('');
  const [notes, setNotes] = useState('');
  const [geo, setGeo] = useState<{lat:number; lng:number} | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!pickupId || !photos || photos.length === 0 || !geo) { setAlert('Pickup, photo and geotag required'); return; }
    const form = new FormData();
    Array.from(photos).forEach(f => form.append('photos', f));
    if (video && video[0]) form.append('video', video[0]);
    form.append('data', JSON.stringify({ geo, signature, otp, beneficiaryCount: beneficiaries===''? undefined : Number(beneficiaries), notes }));
    try { await api.multipart(`/proofs/${pickupId}`, form, 'POST'); setAlert('Submitted'); }
    catch (e: any) { setAlert(e.message || 'Submission failed'); }
  };

  return (
    <main className="container narrow">
      <h1>Proof of Delivery</h1>
      {alert && <div className="alert" role="status">{alert}</div>}
      <form onSubmit={onSubmit} className="form">
        <label>Pickup ID<input value={pickupId} onChange={e=>setPickupId(e.target.value)} required /></label>
        <label>Photo(s) (required)<input type="file" accept="image/*" multiple onChange={e=>setPhotos(e.target.files)} required /></label>
        <label>Short video (optional)<input type="file" accept="video/*" onChange={e=>setVideo(e.target.files)} /></label>
        <label>Digital signature<input value={signature} onChange={e=>setSignature(e.target.value)} placeholder="Signer name or base64" /></label>
        <label>OTP<input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="If used" /></label>
        <label>Beneficiary count<input type="number" value={beneficiaries} onChange={e=>setBeneficiaries(e.target.value===''? '' : Number(e.target.value))} min={0} /></label>
        <label>Notes<textarea value={notes} onChange={e=>setNotes(e.target.value)} /></label>
        <div>
          <button type="button" onClick={() => navigator.geolocation.getCurrentPosition((pos)=> setGeo({ lat: pos.coords.latitude, lng: pos.coords.longitude }))}>Capture Geotag</button>
          {geo && <span> lat: {geo.lat.toFixed(5)}, lng: {geo.lng.toFixed(5)}</span>}
        </div>
        <button className="btn primary" type="submit">Submit</button>
      </form>
    </main>
  );
}
