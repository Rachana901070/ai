import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentPosition } from '../../lib/geo';
import ImageUploader from '../../components/ImageUploader.jsx';
import * as donations from '../../services/donations';

export default function NewDonation(){
  const [type, setType] = useState('VEG');
  const [cooked, setCooked] = useState(true);
  const [qty, setQty] = useState('');
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { lat, lng } = await getCurrentPosition();
      const payload = {
        meta: { type, cooked, qtyEstimate: qty },
        location: { lat, lng },
        images,
      };
      const donation = await donations.createDonation(payload);
      alert('Donation created');
      navigate(`/donor/donations/${donation.id || donation._id}`);
    } catch (e) {
      alert(e.message || 'Failed to create donation');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container">
      <form className="card" onSubmit={onSubmit}>
        <h2 style={{ marginTop: 0 }}>New Donation</h2>
        <div className="row">
          <div className="form-field">
            <label htmlFor="type">Food Type</label>
            <select id="type" value={type} onChange={(e)=>setType(e.target.value)}>
              <option value="VEG">Vegetarian</option>
              <option value="NON_VEG">Non-Vegetarian</option>
              <option value="PACKAGED">Packaged</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="cooked">Cooked?</label>
            <select id="cooked" value={String(cooked)} onChange={(e)=>setCooked(e.target.value === 'true')}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="qty">Quantity (estimate)</label>
          <input id="qty" value={qty} onChange={(e)=>setQty(e.target.value)} placeholder="e.g., 20 meals" />
        </div>
        <div className="form-field">
          <label>Images</label>
          <ImageUploader onUploaded={(paths)=>setImages(paths)} />
        </div>
        <button type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit Donation'}</button>
      </form>
    </section>
  );
}
