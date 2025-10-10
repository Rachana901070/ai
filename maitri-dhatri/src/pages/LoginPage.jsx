import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button.jsx';
import { Input, Label } from '../ui/Input.jsx';
import { loginAction } from '../services/auth.js';

export function LoginPage() {
  const [email, setEmail] = useState('donor@example.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await loginAction({ email, password });
      const from = location.state?.from?.pathname;
      if (from) navigate(from, { replace: true });
      else if (user.role === 'donor') navigate('/donor/dashboard');
      else if (user.role === 'collector') navigate('/collector/requests');
      else if (user.role === 'admin') navigate('/admin/map');
      else navigate('/');
    } catch (e) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-xl font-semibold">Login</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <Button disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</Button>
      </form>
    </div>
  );
}
