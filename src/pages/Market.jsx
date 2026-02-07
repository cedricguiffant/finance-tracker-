import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { portfolioHoldings } from '../data/stocks';
import { marketIndices } from '../data/news';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export default function Market() {
  const barData = {
    labels: portfolioHoldings.map((s) => s.symbol),
    datasets: [
      {
        label: 'Variation du jour (%)',
        data: portfolioHoldings.map((s) => s.changePercent),
        backgroundColor: portfolioHoldings.map((s) =>
          s.changePercent >= 0 ? 'rgba(16, 185, 129, 0.7)' : 'rgba(239, 68, 68, 0.7)'
        ),
        borderColor: portfolioHoldings.map((s) =>
          s.changePercent >= 0 ? '#10b981' : '#ef4444'
        ),
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e1b4b',
        titleColor: '#e0e7ff',
        bodyColor: '#c7d2fe',
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => `${ctx.parsed.y >= 0 ? '+' : ''}${ctx.parsed.y.toFixed(2)}%`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { weight: 600 } },
      },
      y: {
        grid: { color: 'rgba(99, 102, 241, 0.08)' },
        ticks: {
          color: '#94a3b8',
          callback: (v) => `${v >= 0 ? '+' : ''}${v}%`,
        },
      },
    },
  };

  return (
    <div className="market-page">
      {/* Market Indices */}
      <div className="market-indices-row">
        {marketIndices.map((idx) => (
          <div key={idx.name} className="market-index-card">
            <div className="index-card-header">
              <span className="index-card-name">{idx.name}</span>
              <span className={`index-card-change ${idx.change >= 0 ? 'positive' : 'negative'}`}>
                {idx.change >= 0 ? '▲' : '▼'} {idx.change >= 0 ? '+' : ''}{idx.changePercent.toFixed(2)}%
              </span>
            </div>
            <span className="index-card-value">
              {idx.value.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
            </span>
            <span className="index-card-abs">
              {idx.change >= 0 ? '+' : ''}{idx.change.toFixed(2)} pts
            </span>
            <a href={idx.sourceUrl} target="_blank" rel="noopener noreferrer" className="index-card-source">
              Source : {idx.source}
            </a>
          </div>
        ))}
      </div>

      {/* Daily performance chart */}
      <div className="chart-card full-width">
        <div className="chart-card-header">
          <h3>Variation du jour — Vos positions</h3>
          <span className="chart-subtitle">Performance intraday de chaque action du portefeuille</span>
        </div>
        <div className="chart-container" style={{ height: '350px' }}>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      {/* Market overview table */}
      <div className="card">
        <div className="card-header">
          <h3>Vue d'ensemble du marché</h3>
        </div>
        <div className="table-wrapper">
          <table className="stocks-table">
            <thead>
              <tr>
                <th>Symbole</th>
                <th>Nom</th>
                <th>Place</th>
                <th>Cours</th>
                <th>Var. jour</th>
                <th>Secteur</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {portfolioHoldings.map((stock) => (
                <tr key={stock.symbol}>
                  <td><span className="table-symbol">{stock.symbol}</span></td>
                  <td>{stock.name}</td>
                  <td>{stock.exchange}</td>
                  <td>
                    {stock.currentPrice.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}{' '}
                    {stock.currency === 'EUR' ? '€' : '$'}
                  </td>
                  <td className={stock.change >= 0 ? 'positive' : 'negative'}>
                    {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </td>
                  <td><span className="sector-tag">{stock.sector}</span></td>
                  <td>
                    <a href={stock.sourceUrl} target="_blank" rel="noopener noreferrer" className="table-source-link">
                      {stock.source}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
