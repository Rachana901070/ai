import React, { useEffect, useState } from 'react';
import * as admin from '../../services/admin';

export default function Users(){
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    admin.getUsers().then(setUsers).catch((e)=>alert(e.message)).finally(()=>setLoading(false));
  },[]);
  return (
    <section className="container">
      <h2>Users</h2>
      {loading ? <div className="spinner" /> : (
        <div className="card">
          {users.length ? users.map((u)=> (
            <div key={u.id || u._id} style={{ padding: 8, borderBottom: '1px solid #eee' }}>
              <strong>{u.name || u.email}</strong> — {u.role}
            </div>
          )) : 'No users'}
        </div>
      )}
    </section>
  );
}
