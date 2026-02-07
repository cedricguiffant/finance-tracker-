import React from 'react';
import { useLocation } from 'react-router-dom';

const pageTitles = {
  '/': 'Tableau de bord',
  '/portfolio': 'Mon Portefeuille',
  '/market': 'Marchés',
  '/news': 'Actualités',
  '/sources': 'Sources des données',
};

export default function Header() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'FinanceTracker';
  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="page-title">{title}</h1>
        <span className="header-date">{dateStr}</span>
      </div>
      <div className="header-right">
        <div className="market-status">
          <span className="status-dot open"></span>
          <span>Marchés ouverts</span>
        </div>
        <div className="header-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="Rechercher une action..." />
        </div>
      </div>
    </header>
  );
}
