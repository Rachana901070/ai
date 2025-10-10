import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../api/client';

export default function Home() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<{ mealsMatched: number; donors: number; collectors: number } | null>(null);

  useEffect(() => {
    api.public.stats().then(setStats).catch(() => setStats({ mealsMatched: 0, donors: 0, collectors: 0 }));
  }, []);

  return (
    <main className="container">
      <section className="hero">
        <h1>{t('heroHeadline')}</h1>
        <p>{t('heroSubtitle')}</p>
        <div className="hero-ctas">
          <a className="btn primary" href="/post">{t('donateFood')}</a>
          <a className="btn" href="/register">{t('becomeCollector')}</a>
        </div>
      </section>

      <section className="stats" aria-label={t('liveStats')}>
        <div className="stat">
          <div className="stat-number">{stats?.mealsMatched ?? '—'}</div>
          <div className="stat-label">{t('mealsMatched')}</div>
        </div>
        <div className="stat">
          <div className="stat-number">{stats?.donors ?? '—'}</div>
          <div className="stat-label">{t('donors')}</div>
        </div>
        <div className="stat">
          <div className="stat-number">{stats?.collectors ?? '—'}</div>
          <div className="stat-label">{t('collectors')}</div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>{t('howItWorks')}</h2>
        <div className="grid">
          <div className="card">
            <h3>Donor</h3>
            <ol>
              <li>Post food with photo, quantity, expiry.</li>
              <li>Get matched to nearby collector.</li>
              <li>Track status until pickup.</li>
            </ol>
          </div>
          <div className="card">
            <h3>Collector</h3>
            <ol>
              <li>View nearby posts with time left.</li>
              <li>Accept pickup and navigate.</li>
              <li>Submit proof of delivery.</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
