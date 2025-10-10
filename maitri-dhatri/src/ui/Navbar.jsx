import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Map, UserRound, HeartHandshake, Truck, Settings } from 'lucide-react';
import { Button } from './Button.jsx';
import { useUiStore } from '../stores/ui.js';
import { useAuthStore } from '../stores/auth.js';

export function Navbar() {
  const theme = useUiStore((s) => s.theme);
  const setTheme = useUiStore((s) => s.setTheme);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  useEffect(() => {
    // apply saved theme on mount
    setTheme(theme);
  }, []); // eslint-disable-line

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <HeartHandshake className="text-primary-600" size={20} /> Maitri Dhatri
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/settings"><Button variant="ghost"><Settings size={16} /></Button></Link>
          <Button variant="ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          {user ? (
            <>
              {user.role === 'donor' && (
                <Link to="/donor/dashboard"><Button variant="ghost"><UserRound size={16} /></Button></Link>
              )}
              {user.role === 'collector' && (
                <Link to="/collector/requests"><Button variant="ghost"><Truck size={16} /></Button></Link>
              )}
              {user.role === 'admin' && (
                <Link to="/admin/map"><Button variant="ghost"><Map size={16} /></Button></Link>
              )}
              <Button className="ml-2" onClick={() => { logout(); navigate('/'); }}>Logout</Button>
            </>
          ) : (
            <Link to="/auth/login"><Button>Login</Button></Link>
          )}
        </div>
      </div>
    </nav>
  );
}
