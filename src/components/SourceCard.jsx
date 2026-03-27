import React from 'react';

export default function SourceCard({ source }) {
  return (
    <div className="source-card">
      <div className="source-card-header">
        <span className="source-logo">{source.logo}</span>
        <div className="source-title-block">
          <h3 className="source-name">{source.name}</h3>
          <span className="source-type-badge">{source.type}</span>
        </div>
        <div className="source-reliability">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`reliability-star ${i < source.reliability ? 'filled' : ''}`}>
              ★
            </span>
          ))}
        </div>
      </div>

      <p className="source-description">{source.description}</p>

      <div className="source-meta-grid">
        <div className="source-meta-item">
          <span className="meta-label">Couverture</span>
          <span className="meta-value">{source.coverage}</span>
        </div>
        <div className="source-meta-item">
          <span className="meta-label">Mise à jour</span>
          <span className="meta-value">{source.updateFrequency}</span>
        </div>
      </div>

      <div className="source-data-tags">
        {source.dataProvided.map((item, i) => (
          <span key={i} className="data-tag">{item}</span>
        ))}
      </div>

      <div className="source-card-footer">
        <a href={source.url} target="_blank" rel="noopener noreferrer" className="source-visit-link">
          Visiter {source.name}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
