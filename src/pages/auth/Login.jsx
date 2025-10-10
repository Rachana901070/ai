import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { ROLES } from '../../lib/constants.js';

export default function Login(){
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      const from = location.state?.from?.pathname;
      if (from) return navigate(from, { replace: true });
      if (user.role === ROLES.DONOR) return navigate('/donor/dashboard');
      if (user.role === ROLES.COLLECTOR) return navigate('/collector/requests');
      if (user.role === ROLES.ADMIN) return navigate('/admin/users');
      navigate('/');
    } catch (e) {
      alert(e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container">
      <form className="card" onSubmit={onSubmit} aria-label="Login form">
        <h2 style={{ marginTop: 0 }}>Login</h2>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </section>
  );
}
