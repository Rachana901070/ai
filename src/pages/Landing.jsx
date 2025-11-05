import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing(){
  return (
    <section className="container">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Maitri Dhatri</h1>
        <p>Connecting food donors with collectors/NGOs to reduce waste and feed more people.</p>
        <Link to="/auth/login"><button aria-label="Login">Get Started</button></Link>
      </div>
    </section>
  );
}
