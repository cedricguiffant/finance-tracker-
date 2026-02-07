import React from 'react';
import { Link } from 'react-router-dom';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { portfolioHoldings, portfolioHistory, sectorAllocation } from '../data/stocks';
import { marketIndices } from '../data/news';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler);

function computePortfolioStats() {
  let totalValue = 0;
  let totalCost = 0;
  portfolioHoldings.forEach((s) => {
    totalValue += s.shares * s.currentPrice;
    totalCost += s.shares * s.avgPrice;
  });
  const totalGain = totalValue - totalCost;
  const gainPercent = (totalGain / totalCost) * 100;
  return { totalValue, totalCost, totalGain, gainPercent };
}

export default function Dashboard() {
  const stats = computePortfolioStats();

  const lineData = {
    labels: portfolioHistory.map((p) => p.date),
    datasets: [
      {
        label: 'Valeur du portefeuille (€)',
        data: portfolioHistory.map((p) => p.value),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#6366f1',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const lineOptions = {
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
          label: (ctx) => `${ctx.parsed.y.toLocaleString('fr-FR')} €`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(99, 102, 241, 0.08)' },
        ticks: { color: '#94a3b8' },
      },
      y: {
        grid: { color: 'rgba(99, 102, 241, 0.08)' },
        ticks: {
          color: '#94a3b8',
          callback: (v) => `${(v / 1000).toFixed(0)}k €`,
        },
      },
    },
  };

  const doughnutData = {
    labels: sectorAllocation.map((s) => s.sector),
    datasets: [
      {
        data: sectorAllocation.map((s) => s.value),
        backgroundColor: sectorAllocation.map((s) => s.color),
        borderColor: '#0f172a',
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#94a3b8',
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 10,
          font: { size: 12 },
        },
      },
    },
  };

  const topPerformers = [...portfolioHoldings]
    .sort((a, b) => {
      const gainA = ((a.currentPrice - a.avgPrice) / a.avgPrice) * 100;
      const gainB = ((b.currentPrice - b.avgPrice) / b.avgPrice) * 100;
      return gainB - gainA;
    })
    .slice(0, 5);

  return (
    <div className="dashboard">
      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Valeur totale</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
            </svg>
          </div>
          <span className="kpi-value">{stats.totalValue.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €</span>
          <span className="kpi-sub positive">+{stats.gainPercent.toFixed(1)}% depuis l'achat</span>
        </div>
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Plus-value latente</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <span className="kpi-value positive">+{stats.totalGain.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €</span>
          <span className="kpi-sub">Sur un investissement de {stats.totalCost.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €</span>
        </div>
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Nombre de positions</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
          </div>
          <span className="kpi-value">{portfolioHoldings.length}</span>
          <span className="kpi-sub">{portfolioHoldings.filter(s => s.currency === 'EUR').length} EUR · {portfolioHoldings.filter(s => s.currency === 'USD').length} USD</span>
        </div>
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Meilleure perf.</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <span className="kpi-value">{topPerformers[0]?.symbol}</span>
          <span className="kpi-sub positive">+{(((topPerformers[0]?.currentPrice - topPerformers[0]?.avgPrice) / topPerformers[0]?.avgPrice) * 100).toFixed(1)}%</span>
        </div>
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        <div className="chart-card wide">
          <div className="chart-card-header">
            <h3>Évolution du portefeuille</h3>
            <span className="chart-period">6 derniers mois</span>
          </div>
          <div className="chart-container" style={{ height: '280px' }}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-card-header">
            <h3>Répartition sectorielle</h3>
          </div>
          <div className="chart-container" style={{ height: '280px' }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Indices & Top Performers */}
      <div className="bottom-row">
        <div className="card">
          <div className="card-header">
            <h3>Indices majeurs</h3>
            <span className="card-badge">Temps réel</span>
          </div>
          <div className="indices-list">
            {marketIndices.map((idx) => (
              <div key={idx.name} className="index-row">
                <div className="index-info">
                  <span className="index-name">{idx.name}</span>
                  <a href={idx.sourceUrl} target="_blank" rel="noopener noreferrer" className="index-source">
                    {idx.source}
                  </a>
                </div>
                <div className="index-values">
                  <span className="index-value">{idx.value.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}</span>
                  <span className={`index-change ${idx.change >= 0 ? 'positive' : 'negative'}`}>
                    {idx.change >= 0 ? '+' : ''}{idx.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Top performances</h3>
            <Link to="/portfolio" className="card-link">Voir tout →</Link>
          </div>
          <div className="top-performers-list">
            {topPerformers.map((stock) => {
              const gain = ((stock.currentPrice - stock.avgPrice) / stock.avgPrice * 100);
              return (
                <div key={stock.symbol} className="performer-row">
                  <div className="performer-info">
                    <span className="performer-symbol">{stock.symbol}</span>
                    <span className="performer-name">{stock.name}</span>
                  </div>
                  <div className="performer-values">
                    <span className="performer-price">
                      {stock.currentPrice.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} {stock.currency === 'EUR' ? '€' : '$'}
                    </span>
                    <span className={`performer-gain ${gain >= 0 ? 'positive' : 'negative'}`}>
                      {gain >= 0 ? '+' : ''}{gain.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
