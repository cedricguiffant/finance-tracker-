import { useState, useEffect } from 'react'
import { Browser } from '@capacitor/browser'
import './App.css'

const openArticle = async (url) => {
  try {
    await Browser.open({ url })
  } catch {
    window.open(url, '_blank')
  }
}

const NEWS_DATABASE = {
  'AAPL': [
    { source: 'Bloomberg', title: "Apple depasse les attentes avec l'iPhone 17", date: '20 fev 2026', snippet: "Les ventes du nouvel iPhone propulsent le chiffre d'affaires au-dela des previsions des analystes.", url: 'https://www.bloomberg.com/quote/AAPL:US' },
    { source: 'Reuters', title: 'Apple accelere dans l\'IA generative', date: '18 fev 2026', snippet: "Le geant californien annonce de nouvelles fonctionnalites IA integrees a iOS 20.", url: 'https://www.reuters.com/technology/apple/' },
  ],
  'MSFT': [
    { source: 'CNBC', title: 'Microsoft Azure : croissance de 35% au dernier trimestre', date: '19 fev 2026', snippet: "Le cloud continue de tirer la croissance de Microsoft avec des revenus records.", url: 'https://www.cnbc.com/quotes/MSFT' },
    { source: 'Les Echos', title: 'Microsoft investit 10 milliards dans Copilot', date: '17 fev 2026', snippet: "L'assistant IA Copilot s'etend a tous les produits de la suite Office.", url: 'https://www.lesechos.fr/tech-medias/hightech/microsoft' },
  ],
  'GOOGL': [
    { source: 'TechCrunch', title: 'Alphabet : Gemini 3 revolutionne la recherche', date: '20 fev 2026', snippet: "Google lance une nouvelle version de son modele IA avec des performances inedites.", url: 'https://techcrunch.com/tag/google/' },
    { source: 'Capital', title: 'Google Cloud gagne des parts de marche', date: '16 fev 2026', snippet: "Google Cloud se rapproche d'AWS et Azure dans le classement mondial du cloud.", url: 'https://www.capital.fr/entreprises-marches/alphabet-google' },
  ],
  'AMZN': [
    { source: 'Bloomberg', title: 'Amazon Prime atteint 300 millions d\'abonnes', date: '19 fev 2026', snippet: "Le service d'abonnement d'Amazon franchit un cap historique dans le monde.", url: 'https://www.bloomberg.com/quote/AMZN:US' },
    { source: 'BFM Business', title: 'AWS lance de nouveaux services IA', date: '15 fev 2026', snippet: "Amazon Web Services etoffe son offre d'intelligence artificielle pour les entreprises.", url: 'https://www.bfmtv.com/economie/entreprises/amazon/' },
  ],
  'TSLA': [
    { source: 'Reuters', title: 'Tesla : le Model Y reste le vehicule le plus vendu au monde', date: '20 fev 2026', snippet: "Pour la troisieme annee consecutive, le SUV electrique domine les ventes mondiales.", url: 'https://www.reuters.com/business/autos-transportation/tesla/' },
    { source: 'Les Echos', title: 'Tesla devoile sa nouvelle Gigafactory en France', date: '14 fev 2026', snippet: "Elon Musk confirme l'implantation d'une usine dans le nord de la France.", url: 'https://www.lesechos.fr/industrie-services/automobile/tesla' },
  ],
  'MC.PA': [
    { source: 'Les Echos', title: 'LVMH : resultats record portes par le luxe asiatique', date: '19 fev 2026', snippet: "Le groupe de Bernard Arnault affiche une croissance de 15% en Asie-Pacifique.", url: 'https://www.lesechos.fr/industrie-services/mode-luxe/lvmh' },
    { source: 'Capital', title: 'LVMH acquiert une nouvelle maison de joaillerie', date: '16 fev 2026', snippet: "Le conglomerat du luxe poursuit sa strategie d'acquisitions avec une marque italienne.", url: 'https://www.capital.fr/entreprises-marches/lvmh' },
  ],
  'OR.PA': [
    { source: 'Boursorama', title: "L'Oreal mise sur la beaute connectee", date: '18 fev 2026', snippet: "Le leader mondial des cosmetiques lance une gamme de produits avec diagnostic IA.", url: 'https://www.boursorama.com/cours/OR.PA/' },
    { source: 'BFM Business', title: "L'Oreal : forte croissance en Amerique du Nord", date: '13 fev 2026', snippet: "Les marques du groupe progressent de 12% sur le marche americain.", url: 'https://www.bfmtv.com/economie/entreprises/l-oreal/' },
  ],
  'NVDA': [
    { source: 'CNBC', title: 'Nvidia : le GPU B300 domine le marche de l\'IA', date: '20 fev 2026', snippet: "La nouvelle puce de Nvidia s'arrache aupres des datacenters du monde entier.", url: 'https://www.cnbc.com/quotes/NVDA' },
    { source: 'Bloomberg', title: 'Nvidia franchit les 5 000 milliards de capitalisation', date: '17 fev 2026', snippet: "Le fabricant de GPU devient la deuxieme entreprise la plus valorisee au monde.", url: 'https://www.bloomberg.com/quote/NVDA:US' },
  ],
  'META': [
    { source: 'TechCrunch', title: 'Meta : le metavers genere enfin des revenus', date: '18 fev 2026', snippet: "Reality Labs affiche son premier trimestre rentable grace aux casques Quest 4.", url: 'https://techcrunch.com/tag/meta/' },
    { source: 'Reuters', title: 'Instagram depasse 3 milliards d\'utilisateurs', date: '15 fev 2026', snippet: "La plateforme photo de Meta atteint un nouveau record d'audience mondiale.", url: 'https://www.reuters.com/technology/meta/' },
  ],
  'AI.PA': [
    { source: 'Les Echos', title: "Air Liquide accelere dans l'hydrogene vert", date: '19 fev 2026', snippet: "Le groupe francais investit massivement dans les energies propres en Europe.", url: 'https://www.lesechos.fr/industrie-services/energie-environnement/air-liquide' },
    { source: 'Boursorama', title: 'Air Liquide releve ses objectifs annuels', date: '14 fev 2026', snippet: "Le specialiste des gaz industriels revoit ses previsions a la hausse.", url: 'https://www.boursorama.com/cours/AI.PA/' },
  ],
  'SAN.PA': [
    { source: 'Capital', title: 'Sanofi : un nouveau traitement contre le cancer approuve', date: '20 fev 2026', snippet: "Le laboratoire francais obtient le feu vert de la FDA pour son immunotherapie.", url: 'https://www.capital.fr/entreprises-marches/sanofi' },
    { source: 'BFM Business', title: 'Sanofi en hausse apres ses resultats', date: '16 fev 2026', snippet: "L'action du groupe pharmaceutique gagne 5% a l'ouverture de la Bourse de Paris.", url: 'https://www.bfmtv.com/economie/entreprises/sanofi/' },
  ],
}

const GENERAL_NEWS = [
  { source: 'Les Echos', title: 'Le CAC 40 atteint un nouveau record historique', date: '21 fev 2026', snippet: "L'indice parisien continue sa progression portee par les valeurs technologiques et le luxe.", url: 'https://www.lesechos.fr/finance-marches/marches-financiers' },
  { source: 'BFM Bourse', title: 'La BCE maintient ses taux directeurs', date: '20 fev 2026', snippet: "La Banque centrale europeenne a decide de maintenir ses taux inchanges lors de sa derniere reunion.", url: 'https://www.tradingsat.com/actualites/marches-financiers/' },
  { source: 'Reuters', title: 'Wall Street : le S&P 500 en hausse de 1,2%', date: '19 fev 2026', snippet: "Les marches americains terminent la semaine en forte hausse grace aux resultats technologiques.", url: 'https://www.reuters.com/markets/' },
]

async function fetchStockPrice(symbol) {
  const res = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`
  )
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  const meta = data.chart.result[0].meta
  return {
    price: meta.regularMarketPrice,
    previousClose: meta.chartPreviousClose,
    currency: meta.currency,
  }
}

function formatCurrency(amount, currency = 'EUR') {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency }).format(amount)
}

function formatPercent(value) {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

function App() {
  const [page, setPage] = useState('portfolio')
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedStock, setSelectedStock] = useState(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(null)

  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('ft_portfolio')
    return saved ? JSON.parse(saved) : []
  })

  // Add stock form
  const [stockSymbol, setStockSymbol] = useState('')
  const [stockName, setStockName] = useState('')
  const [stockShares, setStockShares] = useState('')
  const [stockBuyPrice, setStockBuyPrice] = useState('')

  useEffect(() => {
    localStorage.setItem('ft_portfolio', JSON.stringify(portfolio))
  }, [portfolio])

  // Fetch real prices for all stocks in portfolio
  const refreshPrices = async () => {
    if (portfolio.length === 0) return
    setLoading(true)
    const updated = [...portfolio]
    for (const stock of updated) {
      try {
        const data = await fetchStockPrice(stock.symbol)
        stock.currentPrice = data.price
        stock.change = ((data.price - data.previousClose) / data.previousClose) * 100
        stock.currency = data.currency
      } catch {
        // Keep existing price on error
      }
    }
    setPortfolio(updated)
    setLastUpdate(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }))
    setLoading(false)
  }

  // Fetch prices on mount and when portfolio changes (new stock added)
  useEffect(() => {
    if (portfolio.length > 0) {
      refreshPrices()
    }
  }, [portfolio.length])

  const addStock = async (e) => {
    e.preventDefault()
    if (!stockSymbol || !stockName || !stockShares || !stockBuyPrice) return
    const sym = stockSymbol.toUpperCase().trim()
    const existing = portfolio.find(s => s.symbol === sym)
    if (existing) return

    const buyPrice = parseFloat(stockBuyPrice)

    // Fetch real current price
    let currentPrice = buyPrice
    let change = 0
    let currency = 'USD'
    try {
      const data = await fetchStockPrice(sym)
      currentPrice = data.price
      change = ((data.price - data.previousClose) / data.previousClose) * 100
      currency = data.currency
    } catch {
      // Use buy price as fallback
    }

    const newStock = {
      symbol: sym,
      name: stockName.trim(),
      shares: parseInt(stockShares),
      buyPrice: buyPrice,
      currentPrice: currentPrice,
      change: change,
      currency: currency,
      addedDate: new Date().toLocaleDateString('fr-FR'),
    }
    setPortfolio([...portfolio, newStock])
    setStockSymbol('')
    setStockName('')
    setStockShares('')
    setStockBuyPrice('')
    setShowAddForm(false)
  }

  const deleteStock = (symbol) => {
    setPortfolio(portfolio.filter(s => s.symbol !== symbol))
    if (selectedStock === symbol) setSelectedStock(null)
  }

  const portfolioTotal = portfolio.reduce((s, st) => s + st.currentPrice * st.shares, 0)
  const portfolioInvested = portfolio.reduce((s, st) => s + st.buyPrice * st.shares, 0)
  const portfolioGain = portfolioTotal - portfolioInvested
  const portfolioGainPct = portfolioInvested > 0 ? (portfolioGain / portfolioInvested) * 100 : 0

  // Build news based on portfolio
  const getPortfolioNews = () => {
    const news = []
    for (const stock of portfolio) {
      const stockNews = NEWS_DATABASE[stock.symbol]
      if (stockNews) {
        stockNews.forEach(n => news.push({ ...n, symbol: stock.symbol, stockName: stock.name }))
      }
    }
    news.sort((a, b) => {
      const dateA = a.date.split(' ')
      const dateB = b.date.split(' ')
      return parseInt(dateB[0]) - parseInt(dateA[0])
    })
    return news
  }

  const getStockNews = (symbol) => {
    return NEWS_DATABASE[symbol] || []
  }

  const portfolioNews = getPortfolioNews()

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1>Finance Tracker</h1>
        {page === 'portfolio' && portfolio.length > 0 && (
          <>
            <div className="balance-label">Valeur du portfolio</div>
            <div className="balance">{formatCurrency(portfolioTotal, 'USD')}</div>
            <div className={`header-gain ${portfolioGain >= 0 ? 'up' : 'down'}`}>
              {portfolioGain >= 0 ? '+' : ''}{formatCurrency(portfolioGain, 'USD')} ({formatPercent(portfolioGainPct)})
            </div>
            <div className="header-update">
              {loading ? 'Mise a jour...' : lastUpdate ? `Cours a ${lastUpdate}` : ''}
              {!loading && <button className="refresh-btn" onClick={refreshPrices}>{'\u21BB'}</button>}
            </div>
          </>
        )}
        {page === 'portfolio' && portfolio.length === 0 && (
          <>
            <div className="balance-label">Commencez par ajouter des actions</div>
            <div className="balance">{formatCurrency(0)}</div>
          </>
        )}
        {page === 'news' && (
          <>
            <div className="balance-label">Actualites de vos actions</div>
            <div className="header-count">{portfolioNews.length} articles</div>
          </>
        )}
        {page === 'detail' && selectedStock && (
          <>
            <div className="balance-label">{portfolio.find(s => s.symbol === selectedStock)?.name}</div>
            <div className="balance">{portfolio.find(s => s.symbol === selectedStock)?.symbol}</div>
          </>
        )}
      </div>

      {/* Summary cards on portfolio page */}
      {page === 'portfolio' && portfolio.length > 0 && (
        <div className="summary">
          <div className="summary-card">
            <div className="label">Investi</div>
            <div className="amount">{formatCurrency(portfolioInvested, 'USD')}</div>
          </div>
          <div className="summary-card">
            <div className="label">+/- Value</div>
            <div className={`amount ${portfolioGain >= 0 ? 'income' : 'expense'}`}>
              {portfolioGain >= 0 ? '+' : ''}{formatCurrency(portfolioGain, 'USD')}
            </div>
          </div>
          <div className="summary-card">
            <div className="label">Actions</div>
            <div className="amount">{portfolio.length}</div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="content">

        {/* Portfolio page */}
        {page === 'portfolio' && (
          <>
            {/* Add button */}
            {!showAddForm && (
              <button className="add-stock-btn" onClick={() => setShowAddForm(true)}>
                + Ajouter une action
              </button>
            )}

            {/* Add form */}
            {showAddForm && (
              <div className="add-form">
                <div className="form-header">
                  <h3>Ajouter une action</h3>
                  <button className="close-btn" onClick={() => setShowAddForm(false)}>{'\u2715'}</button>
                </div>
                <form onSubmit={addStock}>
                  <div className="form-row">
                    <input type="text" placeholder="Symbole (ex: AAPL)" value={stockSymbol}
                      onChange={e => setStockSymbol(e.target.value)} />
                    <input type="text" placeholder="Nom de l'entreprise" value={stockName}
                      onChange={e => setStockName(e.target.value)} />
                  </div>
                  <div className="form-row">
                    <input type="number" placeholder="Nb d'actions" min="1" value={stockShares}
                      onChange={e => setStockShares(e.target.value)} />
                    <input type="number" placeholder="Prix d'achat" step="0.01" min="0" value={stockBuyPrice}
                      onChange={e => setStockBuyPrice(e.target.value)} />
                  </div>
                  <button type="submit" className="submit-btn"
                    disabled={!stockSymbol || !stockName || !stockShares || !stockBuyPrice}>
                    Ajouter au portfolio
                  </button>
                </form>
              </div>
            )}

            {/* Stock list */}
            <h3 className="section-title">Mon Portfolio</h3>
            {portfolio.length === 0 ? (
              <div className="empty-state">
                <div className="icon">{'\u{1F4C8}'}</div>
                <p>Ajoutez des actions pour suivre votre portfolio</p>
                <p className="empty-hint">Appuyez sur "+ Ajouter une action" pour commencer</p>
              </div>
            ) : (
              <div className="portfolio-list">
                {portfolio.map(stock => {
                  const cur = stock.currency || 'USD'
                  const totalValue = stock.currentPrice * stock.shares
                  const totalInvested = stock.buyPrice * stock.shares
                  const gain = totalValue - totalInvested
                  const gainPct = (gain / totalInvested) * 100

                  return (
                    <div key={stock.symbol} className="stock-item"
                      onClick={() => { setSelectedStock(stock.symbol); setPage('detail') }}>
                      <div className={`stock-symbol-badge ${stock.change >= 0 ? 'up' : 'down'}`}>
                        {stock.symbol.substring(0, 4)}
                      </div>
                      <div className="stock-info">
                        <div className="name">{stock.name}</div>
                        <div className="shares">{stock.shares} actions @ {formatCurrency(stock.buyPrice, cur)}</div>
                      </div>
                      <div className="stock-values">
                        <div className="price">{formatCurrency(stock.currentPrice, cur)}</div>
                        <div className={`change ${stock.change >= 0 ? 'up' : 'down'}`}>
                          {formatPercent(stock.change)} aujourd'hui
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Recent news preview */}
            {portfolio.length > 0 && portfolioNews.length > 0 && (
              <>
                <div className="section-title-row">
                  <h3 className="section-title">Dernieres actualites</h3>
                  <button className="see-all-btn" onClick={() => setPage('news')}>Tout voir</button>
                </div>
                <div className="news-list">
                  {portfolioNews.slice(0, 3).map((news, i) => (
                    <div key={i} className="news-item clickable" onClick={() => openArticle(news.url)}>
                      <div className="news-header">
                        <span className="news-badge">{news.symbol}</span>
                        <span className="news-source">{news.source}</span>
                        <span className="news-date">{news.date}</span>
                      </div>
                      <div className="news-title">{news.title}<span className="news-arrow">{'\u203A'}</span></div>
                      <div className="news-snippet">{news.snippet}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* News page */}
        {page === 'news' && (
          <>
            {portfolioNews.length === 0 && portfolio.length === 0 ? (
              <div className="empty-state">
                <div className="icon">{'\u{1F4F0}'}</div>
                <p>Ajoutez des actions a votre portfolio pour voir les actualites associees</p>
              </div>
            ) : (
              <>
                {/* General market news */}
                <h3 className="section-title">Marches</h3>
                <div className="news-list">
                  {GENERAL_NEWS.map((news, i) => (
                    <div key={`gen-${i}`} className="news-item clickable" onClick={() => openArticle(news.url)}>
                      <div className="news-header">
                        <span className="news-badge market">Marche</span>
                        <span className="news-source">{news.source}</span>
                        <span className="news-date">{news.date}</span>
                      </div>
                      <div className="news-title">{news.title}<span className="news-arrow">{'\u203A'}</span></div>
                      <div className="news-snippet">{news.snippet}</div>
                    </div>
                  ))}
                </div>

                {/* Portfolio-specific news */}
                {portfolioNews.length > 0 && (
                  <>
                    <h3 className="section-title">Vos actions</h3>
                    <div className="news-list">
                      {portfolioNews.map((news, i) => (
                        <div key={`pf-${i}`} className="news-item clickable" onClick={() => openArticle(news.url)}>
                          <div className="news-header">
                            <span className="news-badge">{news.symbol}</span>
                            <span className="news-source">{news.source}</span>
                            <span className="news-date">{news.date}</span>
                          </div>
                          <div className="news-title">{news.title}<span className="news-arrow">{'\u203A'}</span></div>
                          <div className="news-snippet">{news.snippet}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {portfolioNews.length === 0 && (
                  <div className="empty-state" style={{ paddingTop: '20px' }}>
                    <div className="icon">{'\u{1F50D}'}</div>
                    <p>Aucune actualite trouvee pour vos actions</p>
                    <p className="empty-hint">Les actualites apparaitront ici quand des articles concernent vos titres</p>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Stock detail page */}
        {page === 'detail' && selectedStock && (() => {
          const stock = portfolio.find(s => s.symbol === selectedStock)
          if (!stock) return null
          const cur = stock.currency || 'USD'
          const totalValue = stock.currentPrice * stock.shares
          const totalInvested = stock.buyPrice * stock.shares
          const gain = totalValue - totalInvested
          const gainPct = (gain / totalInvested) * 100
          const stockNews = getStockNews(stock.symbol)

          return (
            <>
              <button className="back-btn" onClick={() => setPage('portfolio')}>
                {'\u2190'} Retour au portfolio
              </button>

              {/* Stock overview card */}
              <div className="detail-card">
                <div className="detail-header">
                  <div className={`stock-symbol-badge large ${stock.change >= 0 ? 'up' : 'down'}`}>
                    {stock.symbol.substring(0, 4)}
                  </div>
                  <div className="detail-title">
                    <div className="detail-name">{stock.name}</div>
                    <div className="detail-symbol">{stock.symbol} - {cur}</div>
                  </div>
                </div>

                <div className="detail-price-row">
                  <div className="detail-current-price">{formatCurrency(stock.currentPrice, cur)}</div>
                  <div className={`detail-change ${stock.change >= 0 ? 'up' : 'down'}`}>
                    {formatPercent(stock.change)} aujourd'hui
                  </div>
                </div>

                <div className="detail-stats">
                  <div className="stat">
                    <div className="stat-label">Quantite</div>
                    <div className="stat-value">{stock.shares} actions</div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Prix d'achat</div>
                    <div className="stat-value">{formatCurrency(stock.buyPrice, cur)}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Valeur totale</div>
                    <div className="stat-value">{formatCurrency(totalValue, cur)}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Investissement</div>
                    <div className="stat-value">{formatCurrency(totalInvested, cur)}</div>
                  </div>
                  <div className="stat full-width">
                    <div className="stat-label">Plus/Moins value</div>
                    <div className={`stat-value ${gain >= 0 ? 'up' : 'down'}`}>
                      {gain >= 0 ? '+' : ''}{formatCurrency(gain, cur)} ({formatPercent(gainPct)})
                    </div>
                  </div>
                  <div className="stat full-width">
                    <div className="stat-label">Date d'ajout</div>
                    <div className="stat-value">{stock.addedDate}</div>
                  </div>
                </div>

                <button className="delete-stock-btn" onClick={() => { deleteStock(stock.symbol); setPage('portfolio') }}>
                  Retirer du portfolio
                </button>
              </div>

              {/* Stock news */}
              <h3 className="section-title">Actualites - {stock.name}</h3>
              {stockNews.length > 0 ? (
                <div className="news-list">
                  {stockNews.map((news, i) => (
                    <div key={i} className="news-item clickable" onClick={() => openArticle(news.url)}>
                      <div className="news-header">
                        <span className="news-source">{news.source}</span>
                        <span className="news-date">{news.date}</span>
                      </div>
                      <div className="news-title">{news.title}<span className="news-arrow">{'\u203A'}</span></div>
                      <div className="news-snippet">{news.snippet}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="icon">{'\u{1F4F0}'}</div>
                  <p>Aucune actualite disponible pour {stock.symbol}</p>
                </div>
              )}
            </>
          )
        })()}
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className={`nav-item ${page === 'portfolio' || page === 'detail' ? 'active' : ''}`}
          onClick={() => setPage('portfolio')}>
          <span className="nav-icon">{'\u{1F4CA}'}</span>
          Portfolio
        </button>
        <button className={`nav-item ${page === 'news' ? 'active' : ''}`}
          onClick={() => setPage('news')}>
          <span className="nav-icon">{'\u{1F4F0}'}</span>
          Actualites
        </button>
      </nav>
    </div>
  )
}

export default App
