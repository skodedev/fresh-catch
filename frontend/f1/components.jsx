// Desktop + Mobile shared sub-components

function PromoStrip() {
  const items = [
    'Free delivery over AED 200',
    'Next-day delivery across UAE',
    'Hand-cut & prepped to order',
    '4.9★ from 12,000+ reviews',
    'Sustainably sourced — always',
  ];
  const list = [...items, ...items];
  return (
    <div className="promo-strip">
      <div className="promo-track">
        {list.map((t, i) => (
          <span key={i}>{t}<span className="dot" /></span>
        ))}
      </div>
    </div>
  );
}

function Header({ onCart, onSearch, cartCount, city, setCity }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [cityOpen, setCityOpen] = React.useState(false);
  const [locating, setLocating] = React.useState(false);
  const cityRef = React.useRef(null);
  const EMIRATES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'];
  const CENTERS = [
    { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
    { name: 'Abu Dhabi', lat: 24.4539, lng: 54.3773 },
    { name: 'Sharjah', lat: 25.3463, lng: 55.4209 },
    { name: 'Ajman', lat: 25.4052, lng: 55.5136 },
    { name: 'Umm Al Quwain', lat: 25.5644, lng: 55.5526 },
    { name: 'Ras Al Khaimah', lat: 25.7895, lng: 55.9432 },
    { name: 'Fujairah', lat: 25.1288, lng: 56.3265 },
  ];
  const handleLocate = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        let best = CENTERS[0], bestD = Infinity;
        for (const c of CENTERS) {
          const dx = c.lat - latitude, dy = c.lng - longitude;
          const d = dx*dx + dy*dy;
          if (d < bestD) { bestD = d; best = c; }
        }
        setLocating(false);
        setCity(best.name);
        setCityOpen(false);
      },
      () => { setLocating(false); },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
    );
  };
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  React.useEffect(() => {
    const onDoc = (e) => { if (cityRef.current && !cityRef.current.contains(e.target)) setCityOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  return (
    <React.Fragment>
    <header className={'site-header' + (scrolled ? ' scrolled' : '')}>
      <div className="header-inner">
        <a href="#" className="brand">
          <img src="assets/freshcatch-logo.svg" alt="Freshcatch" style={{height: 32, width: 'auto', display: 'block'}} />
        </a>
        <nav className="nav-row">
          <a href="#" className="active">Shop</a>
          <a href="#">Today's catch</a>
          <a href="#">Sushi grade</a>
          <a href="#">Live</a>
          <a href="#">Recipes</a>
          <a href="#">Our story</a>
        </nav>
        <div className="actions">
          <div className="loc-wrap" ref={cityRef}>
            <button className={'location-pill' + (cityOpen ? ' open' : '')} onClick={() => setCityOpen(o => !o)}>
              <I.MapPin size={13} /> {city || 'Select location'} <I.ChevronDown size={12} />
            </button>
            {cityOpen && (
              <div className="loc-menu" role="listbox">
                <div className="loc-menu-label">Deliver to</div>
                <button className="loc-menu-locate" onClick={handleLocate} disabled={locating}>
                  {locating ? <span className="loc-spinner-sm" /> : <I.Crosshair size={14} />}
                  <span>{locating ? 'Finding you…' : 'Use my current location'}</span>
                </button>
                <div className="loc-menu-sep" />
                {EMIRATES.map(e => (
                  <button
                    key={e}
                    className={'loc-item' + (e === city ? ' selected' : '')}
                    onClick={() => { setCity(e); setCityOpen(false); }}
                  >
                    <I.MapPin size={13} />
                    <span>{e}</span>
                    {e === city && <I.Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="icon-btn" onClick={onSearch}><I.Search /></button>
          <button className="icon-btn"><I.User /></button>
          <button className="icon-btn"><I.Heart /></button>
          <button className="icon-btn" onClick={onCart}>
            <I.Cart />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
    </React.Fragment>
  );
}

function Categories() {
  return (
    <section className="container">
      <div className="section-head">
        <div>
          <h2>Choose &amp; enjoy</h2>
          <p>Every category sourced from a trusted partner — chef-vetted, quality controlled.</p>
        </div>
        <a className="link-arrow" href="#">All categories <I.ArrowRight size={14} /></a>
      </div>
      <div className="cat-grid">
        {CATEGORIES.map((c, i) => {
          const Icon = I[c.icon] || I.Fish;
          return (
            <a className="cat-cell" href="#" key={i}>
              <div className="img-wrap">
                {c.img
                  ? <img src={c.img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                  : <Icon size={26} />}
              </div>
              <h3>{c.name}</h3>
              <div className="count">{c.count} items</div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function TrustRibbon() {
  const items = [
    { ic: 'Truck', title: 'Free delivery', sub: 'On orders above AED 200' },
    { ic: 'Knife', title: 'Free prepping', sub: 'Cleaned, scaled, filleted' },
    { ic: 'Clock', title: 'Next-day arrival', sub: 'Across all 7 emirates' },
    { ic: 'Shield', title: 'Freshness guarantee', sub: '100% money back' },
  ];
  return (
    <section className="trust-ribbon">
      <div className="trust-ribbon-inner">
        {items.map((item, i) => {
          const Ic = I[item.ic];
          return (
            <div className="trust-item" key={i}>
              <div className="ic-wrap"><Ic size={18} /></div>
              <div>
                <b>{item.title}</b>
                <span>{item.sub}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function StockPill({ count }) {
  if (count == null) return null;
  if (count <= 5) {
    return <div className="prod-stock low"><I.Flame size={11} /> Only {count} left</div>;
  }
  if (count <= 10) {
    return <div className="prod-stock med">Selling fast</div>;
  }
  return null;
}

function ProductCard({ product, onAdd }) {
  const [added, setAdded] = React.useState(false);
  const handleAdd = (e) => {
    e.preventDefault(); e.stopPropagation();
    onAdd(product); setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };
  const pct = product.was && product.price < product.was
    ? Math.round((1 - product.price / product.was) * 100)
    : null;
  return (
    <a href="#" className="prod-card">
      <div className="prod-img">
        {product.img && <img src={product.img} alt={product.name} />}
        {product.tag === 'LIVE' && <span className="prod-tag prod-tag-live">LIVE</span>}
        <StockPill count={product.stockLeft} />
      </div>
      <div className="prod-info">
        <span className="prod-cat">{product.cat}</span>
        <h3 className="prod-name">{product.name}</h3>
        {pct != null && (
          <div className="prod-deal-row">
            <span className="prod-deal-pct">−{pct}% off</span>
            <span className="prod-deal-label">Limited time deal</span>
          </div>
        )}
        <div className="prod-price-row">
          <span className="prod-price">AED {product.price}</span>
          {product.was && <span className="prod-was">AED {product.was}</span>}
        </div>
        <button className={'prod-cta' + (added ? ' added' : '')} onClick={handleAdd}>
          {added ? (<><I.Check size={14} /> Added</>) : (<><I.Plus size={14} /> Add to cart</>)}
        </button>
      </div>
    </a>
  );
}

function ProductShelf({ title, subtitle, products, onAdd }) {
  const [tab, setTab] = React.useState('best');
  const tabs = [
    { id: 'best', label: 'Best sellers' },
    { id: 'today', label: "Today's catch" },
    { id: 'offers', label: 'On offer' },
    { id: 'premium', label: 'Premium' },
  ];
  return (
    <section className="container">
      <div className="section-head">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="tabs">
          {tabs.map(t => (
            <button key={t.id} className={tab === t.id ? 'active' : ''} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>
      </div>
      <div className="prod-grid">
        {products.slice(0, 8).map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} />)}
      </div>
    </section>
  );
}

function StorySplit() {
  return (
    <section className="split">
      <div className="container">
        <div>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', color: 'var(--blue)', textTransform: 'uppercase' }}>From our docks</span>
          <h2>Sourced with care, delivered with pride.</h2>
          <p>We work directly with sustainable fisheries from Norway, the Mediterranean, and the Indian Ocean. Every fish is hand-graded, prepped to your exact spec, and shipped on ice within 24 hours. No middlemen, no compromises.</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
            <a className="btn btn-primary" href="#">Read our story <I.ArrowRight size={14} /></a>
            <a className="btn btn-outline" href="#">Sustainability</a>
          </div>
          <div className="split-stats">
            <div className="stat"><b>24h</b><span>FROM CATCH TO DOOR</span></div>
            <div className="stat"><b>12k+</b><span>HAPPY CUSTOMERS</span></div>
            <div className="stat"><b>4.9★</b><span>AVERAGE RATING</span></div>
          </div>
        </div>
        <div className="split-img">imagery placeholder</div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="reviews">
      <div className="container">
        <div className="review-headline">
          <div>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }}>Loved by 12,000+ households</h2>
            <p style={{ color: 'var(--muted)', margin: '8px 0 0', fontSize: 15 }}>The quality speaks for itself — but our customers love to talk about it.</p>
          </div>
          <div className="review-rating-big">
            <b>4.9</b>
            <div>
              <div className="rstars">{[...Array(5)].map((_, i) => <I.Star key={i} size={16} />)}</div>
              <small>Based on 12,438 verified reviews</small>
            </div>
          </div>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <div className="review-card" key={i}>
              <div className="review-stars">{[...Array(r.rating)].map((_, j) => <I.Star key={j} size={14} />)}</div>
              <p className="review-text">"{r.text}"</p>
              <div className="review-meta">
                <div className="review-avatar">{r.name.charAt(0)}</div>
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-area">{r.area} · Verified</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="newsletter">
      <div className="container">
        <h2>Get 15% off your first catch</h2>
        <p>Join the Tideline crew for weekly deals, new arrivals, and chef recipes — straight to your inbox.</p>
        <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
          <input type="email" placeholder="your@email.com" required />
          <button className="btn">Subscribe <I.ArrowRight size={14} /></button>
        </form>
        <div className="newsletter-perks">
          <span><I.Check size={12} /> Exclusive deals</span>
          <span><I.Check size={12} /> Chef recipes</span>
          <span><I.Check size={12} /> No spam, ever</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="foot-grid">
          <div>
            <div className="foot-brand">
              <img src="assets/freshcatch-logo.svg" alt="Freshcatch" style={{height: 30, width: 'auto', filter: 'brightness(0) invert(1)'}} />
            </div>
            <p className="foot-blurb" style={{marginTop: 16}}>Hand-selected seafood from sustainable fisheries — prepped, packed, and shipped overnight across the UAE.</p>
            <div className="foot-social">
              <a href="#" aria-label="Instagram"><I.Instagram size={16} /></a>
              <a href="#" aria-label="Facebook"><I.Facebook size={16} /></a>
              <a href="#" aria-label="X"><I.X size={14} /></a>
              <a href="#" aria-label="WhatsApp"><I.WhatsApp size={16} /></a>
            </div>
          </div>
          <div className="foot-col">
            <h5>Shop</h5>
            <ul>
              <li><a href="#">Today's catch</a></li>
              <li><a href="#">Sushi grade</a></li>
              <li><a href="#">Live seafood</a></li>
              <li><a href="#">Premium</a></li>
              <li><a href="#">Gift cards</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Company</h5>
            <ul>
              <li><a href="#">Our story</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Help</h5>
            <ul>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Delivery</a></li>
              <li><a href="#">Returns</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2025 Tideline Seafood Co. All rights reserved.</span>
          <span>Made with care in Dubai, UAE.</span>
        </div>
      </div>
    </footer>
  );
}

function CartDrawer({ open, onClose, items, onQty }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 200 ? 0 : 25;
  const total = subtotal + shipping;
  return (
    <React.Fragment>
      <div className={'drawer-backdrop' + (open ? ' open' : '')} onClick={onClose} />
      <aside className={'drawer' + (open ? ' open' : '')}>
        <div className="drawer-head">
          <h3>Your basket ({items.length})</h3>
          <button className="icon-btn" onClick={onClose}><I.X /></button>
        </div>
        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="drawer-empty">
              <I.Cart size={36} />
              <h4>Your basket is empty</h4>
              <p>Add fresh seafood to get started.</p>
            </div>
          ) : (
            items.map(item => (
              <div className="drawer-row" key={item.id}>
                <div className="drawer-thumb" />
                <div className="drawer-info">
                  <h5>{item.name}</h5>
                  <small>{item.cat}</small>
                  <div className="qty">
                    <button onClick={() => onQty(item.id, item.qty - 1)}><I.Minus size={12} /></button>
                    <span>{item.qty}</span>
                    <button onClick={() => onQty(item.id, item.qty + 1)}><I.Plus size={12} /></button>
                  </div>
                </div>
                <div className="drawer-price">AED {item.price * item.qty}</div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="drawer-foot">
            <div className="drawer-totals">
              <div className="row"><span>Subtotal</span><span>AED {subtotal}</span></div>
              <div className="row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : 'AED ' + shipping}</span></div>
              <div className="row total"><span>Total</span><span>AED {total}</span></div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Checkout <I.ArrowRight size={14} />
            </button>
          </div>
        )}
      </aside>
    </React.Fragment>
  );
}

function SearchOverlay({ open, onClose }) {
  const [q, setQ] = React.useState('');
  React.useEffect(() => {
    if (open) setTimeout(() => document.getElementById('search-input')?.focus(), 100);
  }, [open]);
  const trending = ['Salmon fillet', 'King crab', 'Yellowfin tuna', 'Live lobster', 'Beluga caviar', 'Hamachi'];
  const results = q ? PRODUCTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase())) : [];
  return (
    <div className={'search-overlay' + (open ? ' open' : '')} onClick={onClose}>
      <button className="search-close" onClick={onClose}><I.X /></button>
      <div className="search-overlay-inner" onClick={e => e.stopPropagation()}>
        <input id="search-input" placeholder="Search for fish, prawns, recipes…" value={q} onChange={e => setQ(e.target.value)} />
        <div className="search-suggestions">
          {q ? (
            results.length === 0 ? <span style={{color: 'rgba(255,255,255,0.5)', padding: 24}}>No matches.</span> :
            results.map(r => (
              <a key={r.id} href="#"><span>{r.name}</span><small>AED {r.price}</small></a>
            ))
          ) : (
            <React.Fragment>
              <small style={{color: 'rgba(255,255,255,0.5)', padding: '12px 0'}}>TRENDING</small>
              {trending.map(t => (
                <a key={t} href="#"><span>{t}</span><I.ArrowRight size={14} /></a>
              ))}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

function Toast({ show, message }) {
  return (
    <div className={'toast' + (show ? ' show' : '')}>
      <I.Check size={14} className="ic" />
      {message}
    </div>
  );
}

function Fab() {
  return (
    <a className="fab" href="#" aria-label="Chat on WhatsApp">
      <I.WhatsApp size={24} />
    </a>
  );
}

function BannerDuo() {
  return (
    <section className="container" style={{paddingTop: 0}}>
      <div className="banner-duo">
        <a href="#" className="banner-card" aria-label="15% welcome offer">
          <img src="assets/banner-welcome.jpg" alt="15% off welcome offer — use code FCAE01" />
        </a>
        <a href="#" className="banner-card" aria-label="Asian snacks">
          <img src="assets/banner-asian.jpg" alt="Asian snacks — shop now" />
        </a>
      </div>
    </section>
  );
}

function LocationModal({ open, onPick }) {
  const [locating, setLocating] = React.useState(false);
  const [locError, setLocError] = React.useState(null);
  const [query, setQuery] = React.useState('');

  // Dubai neighborhoods we deliver to. `popular` ones surface first on empty search.
  const AREAS = [
    { name: 'Downtown Dubai', sub: 'Same-day · 2hr slots', popular: true },
    { name: 'Dubai Marina', sub: 'Same-day · 2hr slots', popular: true },
    { name: 'Palm Jumeirah', sub: 'Same-day · 2hr slots', popular: true },
    { name: 'Business Bay', sub: 'Same-day · 2hr slots', popular: true },
    { name: 'JBR', sub: 'Same-day · 2hr slots', popular: true },
    { name: 'JLT', sub: 'Same-day · 2hr slots', popular: true },
    { name: 'DIFC', sub: 'Same-day · 2hr slots' },
    { name: 'Jumeirah', sub: 'Same-day · 2hr slots' },
    { name: 'Al Barsha', sub: 'Same-day · 2hr slots' },
    { name: 'Dubai Hills', sub: 'Same-day · 2hr slots' },
    { name: 'Arabian Ranches', sub: 'Same-day · evening' },
    { name: 'Mirdif', sub: 'Same-day · evening' },
    { name: 'Deira', sub: 'Same-day · 2hr slots' },
    { name: 'Bur Dubai', sub: 'Same-day · 2hr slots' },
    { name: 'Silicon Oasis', sub: 'Same-day · evening' },
    { name: 'Motor City', sub: 'Same-day · evening' },
    { name: 'Sports City', sub: 'Same-day · evening' },
    { name: 'Meydan', sub: 'Same-day · 2hr slots' },
  ];

  const filtered = query.trim()
    ? AREAS.filter(a => a.name.toLowerCase().includes(query.trim().toLowerCase()))
    : AREAS.filter(a => a.popular);

  const handleLocate = () => {
    setLocError(null);
    if (!navigator.geolocation) { setLocError("Your browser doesn't support location."); return; }
    setLocating(true);
    // Dubai bounding box (approx)
    const DUBAI = { latMin: 24.7, latMax: 25.4, lngMin: 54.85, lngMax: 55.65 };
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocating(false);
        const inDubai = latitude >= DUBAI.latMin && latitude <= DUBAI.latMax
                     && longitude >= DUBAI.lngMin && longitude <= DUBAI.lngMax;
        if (inDubai) onPick('Dubai');
        else setLocError("Looks like you're outside Dubai — we only deliver within Dubai right now.");
      },
      (err) => {
        setLocating(false);
        setLocError(err.code === 1 ? 'Location permission denied. Search your area below.' : "Couldn't get your location. Search your area below.");
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
    );
  };

  if (!open) return null;
  return (
    <div className="loc-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="loc-modal-title">
      <div className="loc-modal">
        <div className="loc-modal-head">
          <span className="loc-modal-eyebrow">Now delivering · Dubai only</span>
          <h2 id="loc-modal-title">Where in Dubai are you?</h2>
          <p>We currently deliver across Dubai only. Pick your area to see today's stock and your fastest slot.</p>
        </div>
        <div className="loc-modal-locate">
          <button className="loc-modal-locate-btn" onClick={handleLocate} disabled={locating}>
            {locating ? <span className="loc-spinner" /> : <I.Crosshair size={15} />}
            <span>{locating ? 'Finding you…' : 'Use my current location'}</span>
          </button>
          {locError && <div className="loc-modal-error">{locError}</div>}
        </div>
        <div className="loc-modal-search">
          <I.Search size={15} />
          <input
            type="text"
            placeholder="Search your area in Dubai…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Search Dubai area"
          />
          {query && (
            <button className="loc-modal-search-clear" onClick={() => setQuery('')} aria-label="Clear search">
              <I.X size={14} />
            </button>
          )}
        </div>
        <div className="loc-modal-areas-label">
          {query.trim() ? `${filtered.length} area${filtered.length === 1 ? '' : 's'} found` : 'Popular areas'}
        </div>
        <div className="loc-modal-areas">
          {filtered.length === 0 ? (
            <div className="loc-modal-empty">
              <p>No matching area in Dubai. Try a different name.</p>
            </div>
          ) : filtered.map(a => (
            <button key={a.name} className="loc-modal-area" onClick={() => onPick(a.name)}>
              <span className="loc-modal-area-pin"><I.MapPin size={14} /></span>
              <span className="loc-modal-area-text">
                <span className="loc-modal-area-name">{a.name}</span>
                <span className="loc-modal-area-sub">{a.sub}</span>
              </span>
              <span className="loc-modal-area-arrow"><I.ChevronRight size={14} /></span>
            </button>
          ))}
        </div>
        <div className="loc-modal-outside">
          Outside Dubai? <a href="#notify">Get notified</a> when we arrive in your emirate.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  PromoStrip, Header, Categories, TrustRibbon,
  ProductCard, ProductShelf, StorySplit, Reviews,
  Newsletter, Footer, CartDrawer, SearchOverlay, Toast, Fab, BannerDuo,
  LocationModal, DealOfTheDay, StockPill,
});

function DealOfTheDay({ products, onAdd }) {
  // Countdown to end-of-day local time
  const targetRef = React.useRef(null);
  if (!targetRef.current) {
    const t = new Date(); t.setHours(23, 59, 59, 999);
    targetRef.current = t.getTime();
  }
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  let diff = Math.max(0, targetRef.current - now);
  const hh = String(Math.floor(diff / 3600000)).padStart(2, '0');
  diff -= Number(hh) * 3600000;
  const mm = String(Math.floor(diff / 60000)).padStart(2, '0');
  diff -= Number(mm) * 60000;
  const ss = String(Math.floor(diff / 1000)).padStart(2, '0');

  // Auto-sliding product carousel: 4 visible at a time
  const items = products || [];
  const VISIBLE = 4;
  const pageCount = Math.max(1, Math.ceil(items.length / VISIBLE));
  const [page, setPage] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (paused || pageCount <= 1) return;
    const id = setInterval(() => setPage(p => (p + 1) % pageCount), 3500);
    return () => clearInterval(id);
  }, [paused, pageCount]);

  return (
    <section className="dod">
      <div className="container dod-container">
        <aside className="dod-side">
          <span className="dod-eyebrow"><I.Flame size={13} /> Limited time</span>
          <h2 className="dod-title">Deal of the Day</h2>
          <p className="dod-sub">Our biggest discounts on best-sellers. Refreshes at midnight — don't miss out.</p>
          <div className="dod-timer" aria-label="Time left">
            <div className="dod-timer-label">Ends in</div>
            <div className="dod-timer-digits">
              <div className="dod-timer-cell"><b>{hh}</b><span>hrs</span></div>
              <em>:</em>
              <div className="dod-timer-cell"><b>{mm}</b><span>min</span></div>
              <em>:</em>
              <div className="dod-timer-cell"><b>{ss}</b><span>sec</span></div>
            </div>
          </div>
          <div className="dod-dots" role="tablist">
            {Array.from({length: pageCount}).map((_, i) => (
              <button key={i} className={'dod-dot' + (i === page ? ' active' : '')}
                onClick={() => setPage(i)} aria-label={`Page ${i+1}`} />
            ))}
          </div>
        </aside>
        <div className="dod-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="dod-track" style={{ transform: `translateX(-${page * 100}%)` }}>
            {Array.from({length: pageCount}).map((_, p) => (
              <div className="dod-page" key={p}>
                {items.slice(p * VISIBLE, p * VISIBLE + VISIBLE).map(prod => (
                  <ProductCard key={prod.id} product={prod} onAdd={onAdd} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { DealOfTheDay });