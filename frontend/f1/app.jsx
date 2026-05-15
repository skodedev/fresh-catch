// Main app — desktop + mobile
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "view": "desktop",
  "heroVariant": "cinematic",
  "accentBlue": "#2b7dbd"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [view, setView] = useState(tweaks.view || 'desktop');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [city, setCity] = useState(null);
  const [locOpen, setLocOpen] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('mobile-view', view === 'mobile');
  }, [view]);

  useEffect(() => {
    document.body.classList.toggle('locked', locOpen && !city);
  }, [locOpen, city]);

  useEffect(() => {
    if (tweaks.accentBlue) {
      document.documentElement.style.setProperty('--blue', tweaks.accentBlue);
    }
  }, [tweaks.accentBlue]);

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setToast({ show: true, msg: `Added ${product.name}` });
    setTimeout(() => setToast({ show: false, msg: '' }), 1800);
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) setCart(prev => prev.filter(i => i.id !== id));
    else setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const handleViewChange = (v) => {
    setView(v);
    setTweak('view', v);
  };

  return (
    <React.Fragment>
      {/* View toggle */}
      <div className="view-toggle">
        <button className={view === 'desktop' ? 'active' : ''} onClick={() => handleViewChange('desktop')}>
          <I.Monitor size={16} /><span>Desk</span>
        </button>
        <button className={view === 'mobile' ? 'active' : ''} onClick={() => handleViewChange('mobile')}>
          <I.Smartphone size={16} /><span>Mob</span>
        </button>
      </div>

      {view === 'desktop' ? (
        <div className="desktop-only">
          <PromoStrip />
          <Header
            onCart={() => setCartOpen(true)}
            onSearch={() => setSearchOpen(true)}
            cartCount={cartCount}
            city={city}
            setCity={setCity}
          />
          <Hero variant={tweaks.heroVariant} />
          <TrustRibbon />
          <Categories />
          <ProductShelf
            title="Today's catch, freshest picks"
            subtitle="Hand-graded this morning. Hand-prepped to your spec. Delivered tomorrow."
            products={PRODUCTS}
            onAdd={addToCart}
          />
          <BannerDuo />
          <DealOfTheDay products={PRODUCTS} onAdd={addToCart} />
          <ProductShelf
            title="Frozen favourites"
            subtitle="Sustainably sourced. Flash-frozen at peak freshness. Ready when you are."
            products={TRENDING.slice(0, 8)}
            onAdd={addToCart}
          />
          <Reviews />
          <Newsletter />
          <Footer />
          <Fab />
        </div>
      ) : (
        <div className="mobile-only">
          <MobileApp
            onCart={() => setCartOpen(true)}
            onSearch={() => setSearchOpen(true)}
            cartCount={cartCount}
            addToCart={addToCart}
          />
        </div>
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onQty={updateQty}
      />
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
      <Toast show={toast.show} message={toast.msg} />
      <LocationModal open={locOpen && !city} onPick={(c) => { setCity(c); setLocOpen(false); }} />
    </React.Fragment>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);