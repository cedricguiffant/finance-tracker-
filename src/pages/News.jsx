import React, { useState } from 'react';
import NewsCard from '../components/NewsCard';
import { newsArticles } from '../data/news';

export default function News() {
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSentiment, setFilterSentiment] = useState('all');

  const categories = ['all', ...new Set(newsArticles.map((a) => a.category))];

  const filtered = newsArticles.filter((a) => {
    if (filterCategory !== 'all' && a.category !== filterCategory) return false;
    if (filterSentiment !== 'all' && a.sentiment !== filterSentiment) return false;
    return true;
  });

  return (
    <div className="news-page">
      <div className="news-toolbar">
        <div className="filter-group">
          <label>Catégorie :</label>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'Toutes les catégories' : c}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Sentiment :</label>
          <select value={filterSentiment} onChange={(e) => setFilterSentiment(e.target.value)}>
            <option value="all">Tous</option>
            <option value="positive">Positif</option>
            <option value="neutral">Neutre</option>
            <option value="negative">Négatif</option>
          </select>
        </div>
      </div>

      <div className="news-disclaimer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span>
          Les informations ci-dessous proviennent de sources tierces. Chaque article cite sa source originale.
          Consultez la page <strong>Sources</strong> pour plus de détails sur les fournisseurs de données.
        </span>
      </div>

      <div className="news-grid">
        {filtered.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <p>Aucune actualité ne correspond aux filtres sélectionnés.</p>
        </div>
      )}
    </div>
  );
}
