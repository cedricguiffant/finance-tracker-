import React, { useState } from 'react';
import StockCard from '../components/StockCard';
import { portfolioHoldings } from '../data/stocks';

export default function Portfolio() {
  const [viewMode, setViewMode] = useState('cards');
  const [sortBy, setSortBy] = useState('value');
  const [filterSector, setFilterSector] = useState('all');

  const sectors = ['all', ...new Set(portfolioHoldings.map((s) => s.sector))];

  const filtered = portfolioHoldings.filter(
    (s) => filterSector === 'all' || s.sector === filterSector
  );

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'value':
        return b.shares * b.currentPrice - a.shares * a.currentPrice;
      case 'gain':
        return (
          (b.currentPrice - b.avgPrice) / b.avgPrice -
          (a.currentPrice - a.avgPrice) / a.avgPrice
        );
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const totalValue = portfolioHoldings.reduce((sum, s) => sum + s.shares * s.currentPrice, 0);

  return (
    <div className="portfolio-page">
      <div className="portfolio-toolbar">
        <div className="toolbar-left">
          <div className="filter-group">
            <label>Secteur :</label>
            <select value={filterSector} onChange={(e) => setFilterSector(e.target.value)}>
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s === 'all' ? 'Tous les secteurs' : s}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Trier par :</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="value">Valeur</option>
              <option value="gain">Performance</option>
              <option value="name">Nom</option>
            </select>
          </div>
        </div>
        <div className="toolbar-right">
          <div className="view-toggle">
            <button
              className={viewMode === 'cards' ? 'active' : ''}
              onClick={() => setViewMode('cards')}
              title="Vue grille"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              className={viewMode === 'table' ? 'active' : ''}
              onClick={() => setViewMode('table')}
              title="Vue tableau"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="stock-cards-grid">
          {sorted.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="stocks-table">
            <thead>
              <tr>
                <th>Symbole</th>
                <th>Nom</th>
                <th>Cours</th>
                <th>Var. jour</th>
                <th>Parts</th>
                <th>Valeur</th>
                <th>+/- value</th>
                <th>Rend.</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((stock) => {
                const val = stock.shares * stock.currentPrice;
                const gain = (stock.currentPrice - stock.avgPrice) * stock.shares;
                const gainPct = ((stock.currentPrice - stock.avgPrice) / stock.avgPrice) * 100;
                return (
                  <tr key={stock.symbol}>
                    <td><span className="table-symbol">{stock.symbol}</span></td>
                    <td>{stock.name}</td>
                    <td>{stock.currentPrice.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} {stock.currency === 'EUR' ? '€' : '$'}</td>
                    <td className={stock.change >= 0 ? 'positive' : 'negative'}>
                      {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </td>
                    <td>{stock.shares}</td>
                    <td>{val.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} {stock.currency === 'EUR' ? '€' : '$'}</td>
                    <td className={gain >= 0 ? 'positive' : 'negative'}>
                      {gain >= 0 ? '+' : ''}{gain.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} {stock.currency === 'EUR' ? '€' : '$'}
                    </td>
                    <td className={gainPct >= 0 ? 'positive' : 'negative'}>
                      {gainPct >= 0 ? '+' : ''}{gainPct.toFixed(1)}%
                    </td>
                    <td>
                      <a href={stock.sourceUrl} target="_blank" rel="noopener noreferrer" className="table-source-link">
                        {stock.source}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5"><strong>Total portefeuille</strong></td>
                <td colSpan="4"><strong>{totalValue.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} (mixte)</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
