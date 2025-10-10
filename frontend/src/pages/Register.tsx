import { FormEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'donor'|'collector'>('donor');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try { await register(name, email, password, role); } catch (e: any) { setError(e.message || 'Register failed'); }
  };

  return (
    <main className="container narrow">
      <h1>Register</h1>
      <form onSubmit={onSubmit} className="form">
        {error && <div className="alert error" role="alert">{error}</div>}
        <label>Name<input value={name} onChange={e=>setName(e.target.value)} required /></label>
        <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label>
        <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></label>
        <label>Role<select value={role} onChange={e=>setRole(e.target.value as any)}>
          <option value="donor">Donor</option>
          <option value="collector">Collector</option>
        </select></label>
        <button className="btn primary" type="submit">Create account</button>
      </form>
    </main>
  );
}
