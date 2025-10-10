import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { ROLES } from '../lib/constants';
import s from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const goHome = () => {
    if (!user) return navigate('/');
    if (user.role === ROLES.DONOR) return navigate('/donor/dashboard');
    if (user.role === ROLES.COLLECTOR) return navigate('/collector/requests');
    if (user.role === ROLES.ADMIN) return navigate('/admin/users');
    return navigate('/');
  };

  return (
    <nav className="nav">
      <div className="container">
        <div className={s.wrap}>
          <button onClick={goHome} className={s.brand} aria-label="Home">Maitri Dhatri</button>
          <div className={s.links}>
            <Link to="/">Home</Link>
            {user && <Link to="/settings">Settings</Link>}
          </div>
          <div className={s.right}>
            {user ? (
              <>
                <span className={s.role}>{user.role}</span>
                <button onClick={() => { logout(); navigate('/auth/login'); }}>Logout</button>
              </>
            ) : (
              <Link to="/auth/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
