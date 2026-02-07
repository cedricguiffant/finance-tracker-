# FinanceTracker

Application professionnelle de suivi de portefeuille boursier avec actualités financières et sources de données transparentes.

## Fonctionnalités

- **Tableau de bord** — Vue d'ensemble du portefeuille avec graphiques d'évolution et répartition sectorielle
- **Portefeuille** — Suivi détaillé des positions (actions US et européennes) avec vue grille et tableau
- **Marchés** — Indices majeurs (CAC 40, S&P 500, NASDAQ, DAX) et variations intraday
- **Actualités** — Fil d'actualités financières avec sentiment, catégories et filtres
- **Sources** — Page dédiée référençant toutes les sources de données (Yahoo Finance, Boursorama, Euronext, Reuters, Bloomberg, etc.)

## Stack technique

- React 18 + React Router
- Vite
- Chart.js + react-chartjs-2
- CSS custom (dark theme professionnel)

## Installation

```bash
npm install
npm run dev
```

## Sources de données

Chaque cours, indice et article cite sa source originale avec un lien direct. Les sources incluent :

| Source | Type | Couverture |
|--------|------|------------|
| Yahoo Finance | API / Web | Actions US, Indices |
| Boursorama | Web | Euronext, Analyses |
| Euronext | Bourse officielle | Cotations officielles |
| Reuters | Agence de presse | Actualités mondiales |
| Bloomberg | Terminal / Web | Données de marché |
| Les Échos | Presse économique | Analyses FR |
| CNBC | Média financier | Actualités US |
| Financial Times | Presse financière | Analyses mondiales |
