import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children, role }: { children: JSX.Element; role?: 'donor'|'collector'|'admin' }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role && !(role==='admin' && user.role==='admin')) return <Navigate to="/" replace />;
  return children;
}
