import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="nav">
      <div className="nav-left" onClick={() => navigate('/')}>{t('appName')}</div>
      <nav className="nav-links" aria-label="Main Navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">{t('about')}</NavLink>
        <NavLink to="/tech">{t('tech')}</NavLink>
        <NavLink to="/privacy">{t('privacy')}</NavLink>
        <NavLink to="/faqs">{t('faqs')}</NavLink>
        {user?.role === 'admin' && <NavLink to="/admin">{t('admin')}</NavLink>}
        {user && user.role === 'donor' && <NavLink to="/post">{t('postFood')}</NavLink>}
        {user && user.role === 'collector' && <NavLink to="/collector">{t('collectorDashboard')}</NavLink>}
      </nav>
      <div className="nav-right">
        <select aria-label="Language" onChange={(e)=>i18n.changeLanguage(e.target.value)} value={i18n.language}>
          <option value="en">EN</option>
          <option value="hi">हिंदी</option>
          <option value="te">తెలుగు</option>
        </select>
        {!user ? (
          <>
            <NavLink to="/login">{t('login')}</NavLink>
            <NavLink to="/register">{t('register')}</NavLink>
          </>
        ) : (
          <button onClick={logout} aria-label="Logout">{t('logout')}</button>
        )}
      </div>
    </header>
  );
}
