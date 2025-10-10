import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Settings(){
  const { user } = useAuth();
  return (
    <section className="container">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Settings</h2>
        {user ? (
          <>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </>
        ) : 'Not signed in'}
      </div>
    </section>
  );
}
