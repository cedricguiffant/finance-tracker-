import React from 'react';

const sentimentLabels = {
  positive: { label: 'Positif', className: 'sentiment-positive' },
  negative: { label: 'Négatif', className: 'sentiment-negative' },
  neutral: { label: 'Neutre', className: 'sentiment-neutral' },
};

export default function NewsCard({ article }) {
  const sentiment = sentimentLabels[article.sentiment] || sentimentLabels.neutral;
  const dateFormatted = new Date(article.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="news-card">
      <div className="news-card-header">
        <div className="news-meta">
          <span className="news-category">{article.category}</span>
          <span className={`news-sentiment ${sentiment.className}`}>{sentiment.label}</span>
        </div>
        <span className="news-date">{dateFormatted}</span>
      </div>

      <h3 className="news-title">{article.title}</h3>
      <p className="news-summary">{article.summary}</p>

      {article.relatedStocks.length > 0 && (
        <div className="news-stocks">
          {article.relatedStocks.map((symbol) => (
            <span key={symbol} className="news-stock-tag">{symbol}</span>
          ))}
        </div>
      )}

      <div className="news-card-footer">
        <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="source-link">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          {article.source}
        </a>
        <span className="news-author">{article.author}</span>
      </div>
    </article>
  );
}
