import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { api } from '../api/client';

export default function PostFood() {
  const [photoFiles, setPhotoFiles] = useState<FileList | null>(null);
  const [foodType, setFoodType] = useState('Cooked Meal');
  const [quantity, setQuantity] = useState('10 servings');
  const [expiryTime, setExpiryTime] = useState<string>('');
  const [lat, setLat] = useState<number | ''>('');
  const [lng, setLng] = useState<number | ''>('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);
  const [mine, setMine] = useState<any[]>([]);
  const alertTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    (async () => {
      try { const list = await api.get<any[]>('/posts'); setMine(list); } catch {}
    })();
  }, []);

  useEffect(() => {
    if (!expiryTime) return;
    const expires = new Date(expiryTime).getTime();
    const minsLeft = Math.round((expires - Date.now()) / 60000);
    if (minsLeft < 30) setAlert('Expiry is less than 30 minutes — collectors may not reach in time.');
    else setAlert(null);
  }, [expiryTime]);

  const canSubmit = useMemo(() => foodType && quantity && expiryTime && lat!=='' && lng!=='', [foodType, quantity, expiryTime, lat, lng]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    if (photoFiles) Array.from(photoFiles).forEach(f => form.append('photos', f));
    const data = { foodType, quantity, expiryTime, location: { lat: Number(lat), lng: Number(lng), address }, notes, anonymous };
    form.append('data', JSON.stringify(data));
    try {
      const created = await api.multipart('/posts', form, 'POST');
      setMine([created, ...mine]);
      if (alertTimeoutRef.current) window.clearTimeout(alertTimeoutRef.current);
      setAlert('Posted successfully.');
      alertTimeoutRef.current = window.setTimeout(() => setAlert(null), 3000);
    } catch (e: any) {
      setAlert(e.message || 'Failed to post');
    }
  };

  return (
    <main className="container">
      <h1>Post Food</h1>
      {alert && <div className="alert" role="status">{alert}</div>}
      <form onSubmit={onSubmit} className="form">
        <label>Upload Photo<input type="file" accept="image/*" multiple onChange={(e)=>setPhotoFiles(e.target.files)} /></label>
        <label>Food Type<select value={foodType} onChange={e=>setFoodType(e.target.value)}>
          <option>Cooked Meal</option>
          <option>Raw Vegetables</option>
          <option>Bakery</option>
          <option>Beverages</option>
        </select></label>
        <label>Quantity<input value={quantity} onChange={e=>setQuantity(e.target.value)} placeholder="e.g. 10 servings" required /></label>
        <label>Expiry Time<input type="datetime-local" value={expiryTime} onChange={e=>setExpiryTime(e.target.value)} required /></label>
        <fieldset>
          <legend>Location</legend>
          <label>Latitude<input type="number" step="any" value={lat} onChange={e=>setLat(e.target.value===''?'' : Number(e.target.value))} required /></label>
          <label>Longitude<input type="number" step="any" value={lng} onChange={e=>setLng(e.target.value===''?'' : Number(e.target.value))} required /></label>
          <label>Address<input value={address} onChange={e=>setAddress(e.target.value)} placeholder="Optional" /></label>
          <button type="button" onClick={() => navigator.geolocation.getCurrentPosition((pos)=>{ setLat(pos.coords.latitude); setLng(pos.coords.longitude); })}>Use GPS</button>
        </fieldset>
        <label>Notes<textarea value={notes} onChange={e=>setNotes(e.target.value)} /></label>
        <label><input type="checkbox" checked={anonymous} onChange={e=>setAnonymous(e.target.checked)} /> Post anonymously</label>
        <button className="btn primary" type="submit" disabled={!canSubmit}>Submit</button>
      </form>

      <h2>My Posts</h2>
      <ul className="list">
        {mine.map((p) => (
          <li key={p._id} className="card">
            <div>
              <strong>{p.foodType}</strong> • {p.quantity} • status: {p.status}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <a className="btn" href={`/post/${p._id}`}>View</a>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
