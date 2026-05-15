// Mobile view — clean, simple, blue/white
function MobileApp({ onCart, onSearch, cartCount, addToCart }) {
  const [activeCat, setActiveCat] = React.useState(0);
  const [activePill, setActivePill] = React.useState('all');
  const [activeNav, setActiveNav] = React.useState('home');

  const pills = ['all', 'salmon', 'tuna', 'prawns', 'crab', 'lobster'];

  return (
    <div className="mobile-frame">
      {/* Header */}
      <div className="m-header" style={{flexDirection: 'column', alignItems: 'stretch', gap: 14}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <img src="assets/freshcatch-logo.svg" alt="Freshcatch" style={{height: 22, width: 'auto'}} />
          <div className="m-header-actions">
            <button className="m-icon-btn"><I.Bell size={16} /></button>
            <button className="m-icon-btn" onClick={onCart}>
              <I.Bag size={16} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
          </div>
        </div>
        <div className="m-greeting">
          <small>Deliver to</small>
          <b style={{display: 'inline-flex', alignItems: 'center', gap: 4}}>
            <I.MapPin size={13} /> Dubai Marina <I.ChevronDown size={12} />
          </b>
        </div>
      </div>

      {/* Search */}
      <div className="m-search-bar" onClick={onSearch}>
        <I.Search size={16} />
        <span style={{flex: 1}}>Search for fresh fish, prawns…</span>
        <I.Sliders size={16} />
      </div>

      {/* Hero */}
      <div className="m-hero">
        <div className="m-hero-poster" style={{
          background: 'radial-gradient(ellipse at 30% 30%, #2b7dbd 0%, #1f5f96 40%, #0c1c2e 100%)'
        }} />
        <video
          src="assets/hero.mp4"
          autoPlay loop muted playsInline preload="auto"
        />
        <div className="scrim" />
        <div className="body">
          <span className="eyebrow"><span className="pulse" /> Today's catch is in</span>
          <h1>Sea-fresh,<br/><em>delivered.</em></h1>
          <p>Hand-prepped seafood, ice-cold to your door overnight.</p>
          <div className="cta-row">
            <a className="btn btn-light" href="#">Shop now <I.ArrowRight size={12} /></a>
            <a className="btn btn-ghost" href="#">Recipes</a>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="m-trust">
        <div className="m-trust-card">
          <div className="ic-wrap"><I.Truck size={16} /></div>
          <div><b>Free delivery</b><span>Over AED 200</span></div>
        </div>
        <div className="m-trust-card">
          <div className="ic-wrap"><I.Knife size={16} /></div>
          <div><b>Free prep</b><span>Cleaned & cut</span></div>
        </div>
        <div className="m-trust-card">
          <div className="ic-wrap"><I.Clock size={16} /></div>
          <div><b>Next-day</b><span>Across UAE</span></div>
        </div>
        <div className="m-trust-card">
          <div className="ic-wrap"><I.Shield size={16} /></div>
          <div><b>Money back</b><span>If not fresh</span></div>
        </div>
      </div>

      {/* Deal banner */}
      <div className="m-deal-banner">
        <h3>Daily flash deal</h3>
        <p>Atlantic salmon — 25% off until midnight.</p>
        <div className="m-deal-timer">
          <div className="cell"><b>04</b><small>HRS</small></div>
          <div className="cell"><b>32</b><small>MIN</small></div>
          <div className="cell"><b>18</b><small>SEC</small></div>
        </div>
        <a className="btn btn-light btn-sm" href="#">Grab the deal <I.ArrowRight size={12} /></a>
      </div>

      {/* Banner stack */}
      <div className="m-banner-stack">
        <a href="#" className="banner-card" aria-label="15% welcome">
          <img src="assets/banner-welcome.jpg" alt="15% off welcome" />
        </a>
        <a href="#" className="banner-card" aria-label="Asian snacks">
          <img src="assets/banner-asian.jpg" alt="Asian snacks" />
        </a>
      </div>

      {/* Popular section */}
      <div className="m-section">
        <div className="m-section-head">
          <h2>Popular today</h2>
          <a href="#">See more</a>
        </div>
        <div className="m-prod-grid">
          {PRODUCTS.slice(0, 4).map(p => (
            <MProductCard key={p.id} product={p} addToCart={addToCart} />
          ))}
        </div>
      </div>

      {/* Side-tab category browse — like reference 2 */}
      <div className="m-section">
        <div className="m-section-head">
          <h2>Shop by category</h2>
        </div>
      </div>
      <div className="m-cat-layout">
        <div className="m-cat-tabs">
          {CATEGORIES.slice(0, 6).map((c, i) => (
            <button
              key={i}
              className={activeCat === i ? 'active' : ''}
              onClick={() => setActiveCat(i)}
            >{c.name.split(' ')[0]}</button>
          ))}
        </div>
        <div className="m-cat-content">
          <div className="m-cat-pills">
            {pills.map(p => (
              <button
                key={p}
                className={activePill === p ? 'active' : ''}
                onClick={() => setActivePill(p)}
              >{p.charAt(0).toUpperCase() + p.slice(1)}</button>
            ))}
          </div>
          <div className="m-prod-grid">
            {PRODUCTS.slice(activeCat % 4, (activeCat % 4) + 4).map(p => (
              <MProductCard key={p.id} product={p} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </div>

      {/* Trending */}
      <div className="m-section">
        <div className="m-section-head">
          <h2>Trending</h2>
          <a href="#">See more</a>
        </div>
        <div className="m-prod-grid">
          {TRENDING.slice(0, 4).map(p => (
            <MProductCard key={p.id} product={p} addToCart={addToCart} />
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="m-section m-reviews">
        <div className="m-section-head">
          <h2>Loved by 12k+ households</h2>
        </div>
        <div className="m-reviews-scroll">
          {REVIEWS.map((r, i) => (
            <div className="m-review-card" key={i}>
              <div className="stars">
                {[...Array(r.rating)].map((_, j) => <I.Star key={j} size={12} />)}
              </div>
              <p>"{r.text}"</p>
              <div className="meta">
                <div className="avatar">{r.name.charAt(0)}</div>
                <div>
                  <div style={{fontSize: 12, fontWeight: 600}}>{r.name}</div>
                  <div style={{fontSize: 10.5, color: 'var(--muted)'}}>{r.area}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="m-newsletter">
        <h3>Get 15% off your first order</h3>
        <p>Weekly deals, recipes & new arrivals.</p>
        <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
          <input placeholder="your@email.com" type="email" required />
          <button className="btn btn-primary btn-sm">Join</button>
        </form>
      </div>

      {/* Bottom nav */}
      <nav className="m-bottom-nav">
        <button
          className={'m-nav-btn' + (activeNav === 'home' ? ' active' : '')}
          onClick={() => setActiveNav('home')}
        >
          <I.Home size={20} /><span>Home</span>
        </button>
        <button
          className={'m-nav-btn' + (activeNav === 'shop' ? ' active' : '')}
          onClick={() => setActiveNav('shop')}
        >
          <I.Grid size={20} /><span>Shop</span>
        </button>
        <button className="m-nav-btn center" onClick={onSearch}>
          <div className="icon-circle"><I.Search size={20} /></div>
        </button>
        <button
          className={'m-nav-btn' + (activeNav === 'fav' ? ' active' : '')}
          onClick={() => setActiveNav('fav')}
        >
          <I.Heart size={20} /><span>Saved</span>
        </button>
        <button
          className={'m-nav-btn' + (activeNav === 'me' ? ' active' : '')}
          onClick={() => setActiveNav('me')}
        >
          <I.User size={20} /><span>Profile</span>
        </button>
      </nav>
    </div>
  );
}

function MProductCard({ product, addToCart }) {
  const [added, setAdded] = React.useState(false);
  const handleAdd = (e) => {
    e.preventDefault(); e.stopPropagation();
    addToCart(product); setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };
  const pct = product.was && product.price < product.was
    ? Math.round((1 - product.price / product.was) * 100)
    : null;
  return (
    <a href="#" className="m-prod-card">
      <div className="m-prod-img-wrap">
        {product.img && <img src={product.img} alt={product.name} />}
        {product.tag === 'LIVE' && <span className="m-prod-tag">LIVE</span>}
        <StockPill count={product.stockLeft} />
      </div>
      <div className="m-prod-info">
        <div className="cat">{product.cat}</div>
        <h5>{product.name}</h5>
        {pct != null && (
          <div className="prod-deal-row">
            <span className="prod-deal-pct">−{pct}% off</span>
            <span className="prod-deal-label">Limited time deal</span>
          </div>
        )}
        <div className="price-pill">
          <span>AED {product.price}</span>
          {product.was && <small>AED {product.was}</small>}
        </div>
        <button className={'m-prod-cta' + (added ? ' added' : '')} onClick={handleAdd}>
          {added ? (<><I.Check size={13} /> Added</>) : (<><I.Plus size={13} /> Add to cart</>)}
        </button>
      </div>
    </a>
  );
}

window.MobileApp = MobileApp;