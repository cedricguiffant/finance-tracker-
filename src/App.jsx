import { useState, useEffect } from 'react'
import './App.css'

const CATEGORIES = {
  income: ['Salaire', 'Freelance', 'Investissement', 'Vente', 'Autre'],
  expense: ['Alimentation', 'Transport', 'Logement', 'Loisirs', 'Sante', 'Shopping', 'Factures', 'Autre']
}

const CATEGORY_ICONS = {
  Salaire: '\u{1F4B0}', Freelance: '\u{1F4BB}', Investissement: '\u{1F4C8}', Vente: '\u{1F4B5}',
  Alimentation: '\u{1F6D2}', Transport: '\u{1F697}', Logement: '\u{1F3E0}', Loisirs: '\u{1F3AE}',
  Sante: '\u{2764}', Shopping: '\u{1F6CD}', Factures: '\u{1F4C4}', Autre: '\u{1F4CC}'
}

const SAMPLE_NEWS = [
  { source: 'Les Echos', title: 'Le CAC 40 atteint un nouveau record historique', date: '15 fev 2026', snippet: 'L\'indice parisien continue sa progression portee par les valeurs technologiques et le luxe.' },
  { source: 'BFM Bourse', title: 'La BCE maintient ses taux directeurs', date: '14 fev 2026', snippet: 'La Banque centrale europeenne a decide de maintenir ses taux inchanges lors de sa derniere reunion.' },
  { source: 'Capital', title: 'Les meilleures actions a suivre en 2026', date: '13 fev 2026', snippet: 'Notre selection des valeurs les plus prometteuses pour cette annee.' },
  { source: 'Boursorama', title: 'Resultats trimestriels : les entreprises du CAC 40', date: '12 fev 2026', snippet: 'Tour d\'horizon des publications de resultats des grandes entreprises francaises.' },
]

const SAMPLE_PORTFOLIO = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 10, price: 242.50, change: 1.8 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 5, price: 468.20, change: -0.5 },
  { symbol: 'MC.PA', name: 'LVMH', shares: 3, price: 892.40, change: 2.3 },
  { symbol: 'OR.PA', name: "L'Oreal", shares: 8, price: 412.60, change: 0.7 },
]

function formatCurrency(amount) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount)
}

function App() {
  const [page, setPage] = useState('dashboard')
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('ft_transactions')
    return saved ? JSON.parse(saved) : []
  })
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('ft_portfolio')
    return saved ? JSON.parse(saved) : SAMPLE_PORTFOLIO
  })

  // Form state
  const [txType, setTxType] = useState('expense')
  const [txName, setTxName] = useState('')
  const [txAmount, setTxAmount] = useState('')
  const [txCategory, setTxCategory] = useState('')

  // Portfolio form
  const [stockSymbol, setStockSymbol] = useState('')
  const [stockName, setStockName] = useState('')
  const [stockShares, setStockShares] = useState('')
  const [stockPrice, setStockPrice] = useState('')

  useEffect(() => {
    localStorage.setItem('ft_transactions', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem('ft_portfolio', JSON.stringify(portfolio))
  }, [portfolio])

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const balance = totalIncome - totalExpense

  const addTransaction = (e) => {
    e.preventDefault()
    if (!txName || !txAmount || !txCategory) return
    const newTx = {
      id: Date.now(),
      type: txType,
      name: txName,
      amount: parseFloat(txAmount),
      category: txCategory,
      date: new Date().toLocaleDateString('fr-FR')
    }
    setTransactions([newTx, ...transactions])
    setTxName('')
    setTxAmount('')
    setTxCategory('')
  }

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  const addStock = (e) => {
    e.preventDefault()
    if (!stockSymbol || !stockName || !stockShares || !stockPrice) return
    const newStock = {
      symbol: stockSymbol.toUpperCase(),
      name: stockName,
      shares: parseInt(stockShares),
      price: parseFloat(stockPrice),
      change: 0
    }
    setPortfolio([...portfolio, newStock])
    setStockSymbol('')
    setStockName('')
    setStockShares('')
    setStockPrice('')
  }

  const deleteStock = (symbol) => {
    setPortfolio(portfolio.filter(s => s.symbol !== symbol))
  }

  const portfolioTotal = portfolio.reduce((s, st) => s + st.price * st.shares, 0)

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1>Finance Tracker</h1>
        <div className="balance-label">
          {page === 'portfolio' ? 'Valeur du portfolio' : 'Solde total'}
        </div>
        <div className="balance">
          {page === 'portfolio' ? formatCurrency(portfolioTotal) : formatCurrency(balance)}
        </div>
      </div>

      {/* Summary - only on dashboard */}
      {page === 'dashboard' && (
        <div className="summary">
          <div className="summary-card">
            <div className="label">Revenus</div>
            <div className="amount income">{formatCurrency(totalIncome)}</div>
          </div>
          <div className="summary-card">
            <div className="label">Depenses</div>
            <div className="amount expense">{formatCurrency(totalExpense)}</div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="content">
        {/* Dashboard */}
        {page === 'dashboard' && (
          <>
            <h3 className="section-title">Ajouter une transaction</h3>
            <form className="add-form" onSubmit={addTransaction}>
              <div className="type-toggle">
                <button type="button" className={`type-btn ${txType === 'expense' ? 'active-expense' : ''}`}
                  onClick={() => { setTxType('expense'); setTxCategory('') }}>
                  Depense
                </button>
                <button type="button" className={`type-btn ${txType === 'income' ? 'active-income' : ''}`}
                  onClick={() => { setTxType('income'); setTxCategory('') }}>
                  Revenu
                </button>
              </div>
              <div className="form-row">
                <input type="text" placeholder="Description" value={txName}
                  onChange={e => setTxName(e.target.value)} />
              </div>
              <div className="form-row">
                <input type="number" placeholder="Montant" step="0.01" min="0" value={txAmount}
                  onChange={e => setTxAmount(e.target.value)} />
                <select value={txCategory} onChange={e => setTxCategory(e.target.value)}>
                  <option value="">Categorie</option>
                  {CATEGORIES[txType].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="submit-btn"
                disabled={!txName || !txAmount || !txCategory}>
                Ajouter
              </button>
            </form>

            <h3 className="section-title">Transactions recentes</h3>
            {transactions.length === 0 ? (
              <div className="empty-state">
                <div className="icon">{'\u{1F4B3}'}</div>
                <p>Aucune transaction pour le moment</p>
              </div>
            ) : (
              <div className="transaction-list">
                {transactions.map(tx => (
                  <div key={tx.id} className="transaction-item">
                    <div className={`transaction-icon ${tx.type}`}>
                      {CATEGORY_ICONS[tx.category] || '\u{1F4CC}'}
                    </div>
                    <div className="transaction-info">
                      <div className="name">{tx.name}</div>
                      <div className="category">{tx.category}</div>
                      <div className="date">{tx.date}</div>
                    </div>
                    <div className={`transaction-amount ${tx.type}`}>
                      {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </div>
                    <button className="delete-btn" onClick={() => deleteTransaction(tx.id)}>{'\u2715'}</button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Portfolio */}
        {page === 'portfolio' && (
          <>
            <h3 className="section-title">Ajouter une action</h3>
            <form className="portfolio-form" onSubmit={addStock}>
              <div className="form-row">
                <input type="text" placeholder="Symbole (ex: AAPL)" value={stockSymbol}
                  onChange={e => setStockSymbol(e.target.value)} />
                <input type="text" placeholder="Nom" value={stockName}
                  onChange={e => setStockName(e.target.value)} />
              </div>
              <div className="form-row">
                <input type="number" placeholder="Nombre" min="1" value={stockShares}
                  onChange={e => setStockShares(e.target.value)} />
                <input type="number" placeholder="Prix" step="0.01" min="0" value={stockPrice}
                  onChange={e => setStockPrice(e.target.value)} />
              </div>
              <button type="submit" className="submit-btn"
                disabled={!stockSymbol || !stockName || !stockShares || !stockPrice}>
                Ajouter au portfolio
              </button>
            </form>

            <h3 className="section-title">Mon Portfolio</h3>
            {portfolio.length === 0 ? (
              <div className="empty-state">
                <div className="icon">{'\u{1F4CA}'}</div>
                <p>Votre portfolio est vide</p>
              </div>
            ) : (
              <div className="portfolio-list">
                {portfolio.map(stock => (
                  <div key={stock.symbol} className="stock-item">
                    <div className="stock-symbol">{stock.symbol}</div>
                    <div className="stock-info">
                      <div className="name">{stock.name}</div>
                      <div className="shares">{stock.shares} actions</div>
                    </div>
                    <div className="stock-values">
                      <div className="price">{formatCurrency(stock.price)}</div>
                      <div className={`change ${stock.change >= 0 ? 'up' : 'down'}`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change}%
                      </div>
                    </div>
                    <button className="delete-btn" onClick={() => deleteStock(stock.symbol)}>{'\u2715'}</button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* News */}
        {page === 'news' && (
          <>
            <h3 className="section-title">Actualites financieres</h3>
            <div className="news-list">
              {SAMPLE_NEWS.map((news, i) => (
                <div key={i} className="news-item">
                  <div className="news-source">{news.source}</div>
                  <div className="news-title">{news.title}</div>
                  <div className="news-date">{news.date}</div>
                  <div className="news-snippet">{news.snippet}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className={`nav-item ${page === 'dashboard' ? 'active' : ''}`}
          onClick={() => setPage('dashboard')}>
          <span className="nav-icon">{'\u{1F4B3}'}</span>
          Transactions
        </button>
        <button className={`nav-item ${page === 'portfolio' ? 'active' : ''}`}
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
