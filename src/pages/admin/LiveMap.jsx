import React, { useEffect, useState } from 'react';
import LeafletMap from '../../components/LeafletMap.jsx';
import * as donations from '../../services/donations';

export default function LiveMap(){
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState([20.5937, 78.9629]);

  useEffect(() => {
    // naive fetch of nearby for demo map center
    donations.listNearby(20.5937, 78.9629, 1000).then((list)=>{
      const m = (list || []).map((d)=> ({ lat: d.location?.lat, lng: d.location?.lng, label: d.meta?.type }));
      setMarkers(m.filter((x)=>Number.isFinite(x.lat) && Number.isFinite(x.lng)));
    }).catch(()=>{});
  }, []);

  return (
    <section className="container">
      <h2>Live Map</h2>
      <LeafletMap center={center} zoom={5} markers={markers} />
    </section>
  );
}
