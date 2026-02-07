import React from 'react';

export default function StockCard({ stock }) {
  const isPositive = stock.change >= 0;
  const totalValue = stock.shares * stock.currentPrice;
  const totalGain = (stock.currentPrice - stock.avgPrice) * stock.shares;
  const gainPercent = ((stock.currentPrice - stock.avgPrice) / stock.avgPrice * 100);

  return (
    <div className="stock-card">
      <div className="stock-card-header">
        <div className="stock-info">
          <span className="stock-symbol">{stock.symbol}</span>
          <span className="stock-name">{stock.name}</span>
        </div>
        <span className={`stock-badge ${stock.currency === 'EUR' ? 'badge-eur' : 'badge-usd'}`}>
          {stock.exchange}
        </span>
      </div>

      <div className="stock-card-body">
        <div className="stock-price-row">
          <span className="stock-current-price">
            {stock.currentPrice.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} {stock.currency === 'EUR' ? '€' : '$'}
          </span>
          <span className={`stock-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
          </span>
        </div>

        <div className="stock-details-grid">
          <div className="stock-detail">
            <span className="detail-label">Parts</span>
            <span className="detail-value">{stock.shares}</span>
          </div>
          <div className="stock-detail">
            <span className="detail-label">Valeur</span>
            <span className="detail-value">
              {totalValue.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} {stock.currency === 'EUR' ? '€' : '$'}
            </span>
          </div>
          <div className="stock-detail">
            <span className="detail-label">+/- value</span>
            <span className={`detail-value ${totalGain >= 0 ? 'positive' : 'negative'}`}>
              {totalGain >= 0 ? '+' : ''}{totalGain.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} {stock.currency === 'EUR' ? '€' : '$'}
            </span>
          </div>
          <div className="stock-detail">
            <span className="detail-label">Rendement</span>
            <span className={`detail-value ${gainPercent >= 0 ? 'positive' : 'negative'}`}>
              {gainPercent >= 0 ? '+' : ''}{gainPercent.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      <div className="stock-card-footer">
        <a href={stock.sourceUrl} target="_blank" rel="noopener noreferrer" className="source-link">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Source : {stock.source}
        </a>
        <span className="stock-sector">{stock.sector}</span>
      </div>
    </div>
  );
}
