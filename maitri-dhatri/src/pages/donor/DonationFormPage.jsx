import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createDonation } from '../../services/donations.js';
import { uploadToCloudinary } from '../../services/uploads.js';
import { Input, Label, Textarea } from '../../ui/Input.jsx';
import { Button } from '../../ui/Button.jsx';
import { MapView } from '../../components/MapView.jsx';
import { useGeolocation } from '../../hooks/useGeolocation.js';

export function DonationFormPage() {
  const navigate = useNavigate();
  const [type, setType] = useState('Cooked');
  const [cooked, setCooked] = useState(true);
  const [qty, setQty] = useState(10);
  const [desc, setDesc] = useState('');
  const [files, setFiles] = useState([]);
  const { myLocation } = useGeolocation();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createDonation,
    onSuccess: (d) => navigate(`/donor/donations/${d.id}`),
  });

  async function onSubmit(e) {
    e.preventDefault();
    let photos = [];
    for (const file of files) {
      const up = await uploadToCloudinary(file);
      photos.push(up.secure_url || up.url);
    }
    await mutateAsync({ type, cooked, qty, desc, photos, location: myLocation });
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <form className="space-y-3" onSubmit={onSubmit}>
        <div>
          <Label>Type</Label>
          <Input value={type} onChange={(e) => setType(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <input id="cooked" type="checkbox" checked={cooked} onChange={(e) => setCooked(e.target.checked)} />
          <Label htmlFor="cooked">Cooked</Label>
        </div>
        <div>
          <Label>Quantity</Label>
          <Input type="number" min="1" value={qty} onChange={(e) => setQty(parseInt(e.target.value || '0'))} />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div>
          <Label>Photos</Label>
          <Input type="file" multiple accept="image/*" onChange={(e) => setFiles([...e.target.files])} />
        </div>
        <Button disabled={isPending}>{isPending ? 'Submitting...' : 'Submit'}</Button>
      </form>
      <div>
        <MapView center={myLocation} />
        <div className="mt-2 text-sm text-gray-600">{myLocation ? `Your location: ${myLocation.lat.toFixed(4)}, ${myLocation.lng.toFixed(4)}` : 'Allow location to set pickup area (10km).'}</div>
      </div>
    </div>
  );
}
