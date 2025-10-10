import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  return (
    <section className="container">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Donor Dashboard</h2>
        <div className="row wrap">
          <Link to="/donor/new"><button>New Donation</button></Link>
        </div>
      </div>
    </section>
  );
}
