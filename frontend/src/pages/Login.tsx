import { FormEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try { await login(email, password); } catch (e: any) { setError(e.message || 'Login failed'); }
  };

  return (
    <main className="container narrow">
      <h1>Login</h1>
      <form onSubmit={onSubmit} className="form">
        {error && <div className="alert error" role="alert">{error}</div>}
        <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label>
        <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></label>
        <button className="btn primary" type="submit">Login</button>
      </form>
    </main>
  );
}
