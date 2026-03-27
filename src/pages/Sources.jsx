import React from 'react';
import SourceCard from '../components/SourceCard';
import { dataSources } from '../data/sources';

export default function Sources() {
  const bourseSources = dataSources.filter((s) =>
    ['yahoo-finance', 'boursorama', 'euronext'].includes(s.id)
  );
  const pressSources = dataSources.filter((s) =>
    !['yahoo-finance', 'boursorama', 'euronext'].includes(s.id)
  );

  return (
    <div className="sources-page">
      <div className="sources-intro">
        <div className="sources-intro-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            <path d="M8 7h6" /><path d="M8 11h8" />
          </svg>
        </div>
        <div>
          <h2>Transparence des sources</h2>
          <p>
            Toutes les données financières affichées dans FinanceTracker proviennent de sources fiables
            et vérifiables. Chaque cours, indice et actualité est accompagné d'un lien vers sa source originale.
            Cette page référence l'ensemble des fournisseurs de données utilisés.
          </p>
        </div>
      </div>

      <section className="sources-section">
        <h3 className="section-title">
          <span className="section-icon">🏛️</span>
          Données de marché et cotations
        </h3>
        <p className="section-description">
          Sources primaires pour les cours des actions, indices boursiers et données financières en temps réel.
        </p>
        <div className="sources-grid">
          {bourseSources.map((source) => (
            <SourceCard key={source.id} source={source} />
          ))}
        </div>
      </section>

      <section className="sources-section">
        <h3 className="section-title">
          <span className="section-icon">📰</span>
          Actualités et analyses
        </h3>
        <p className="section-description">
          Sources d'information pour les actualités financières, analyses de marché et recommandations.
        </p>
        <div className="sources-grid">
          {pressSources.map((source) => (
            <SourceCard key={source.id} source={source} />
          ))}
        </div>
      </section>

      <div className="sources-footer-note">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        </svg>
        <p>
          <strong>Note :</strong> Les données affichées sont fournies à titre informatif uniquement et ne constituent
          pas un conseil en investissement. Les cours peuvent être différés de 15 minutes pour les données gratuites.
          Vérifiez toujours les informations auprès des sources officielles avant de prendre une décision d'investissement.
        </p>
      </div>
    </div>
  );
}
