'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES, PRODUCTS, REVIEWS, TRENDING } from '@/lib/data';
import { useStore } from '@/lib/store';
import { I } from './icons';
import { MProductCard } from './MProductCard';

export function MobileHome() {
  const { setSearchOpen } = useStore();
  const [activeCat, setActiveCat] = React.useState(0);
  const [activePill, setActivePill] = React.useState('all');
  const pills = ['all', 'salmon', 'tuna', 'prawns', 'crab', 'lobster'];

  return (
    <>
      {/* Hero */}
      <div className="m-hero">
        <div className="m-hero-poster" style={{
          background: 'radial-gradient(ellipse at 30% 30%, #2b7dbd 0%, #1f5f96 40%, #0c1c2e 100%)'
        }} />
        <video src="/assets/hero.mp4" autoPlay loop muted playsInline preload="auto" />
        <div className="scrim" />
        <div className="body">
          <span className="eyebrow"><span className="pulse" /> Today&apos;s catch is in</span>
          <h1>Sea-fresh,<br /><em>delivered.</em></h1>
          <p>Hand-prepped seafood, ice-cold to your door overnight.</p>
          <div className="cta-row">
            <Link className="btn btn-light" href="/shop">Shop now <I.ArrowRight size={12} /></Link>
            <a className="btn btn-ghost" href="#">Recipes</a>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="m-trust">
        <div className="m-trust-card"><div className="ic-wrap"><I.Truck size={16} /></div><div><b>Free delivery</b><span>Over AED 200</span></div></div>
        <div className="m-trust-card"><div className="ic-wrap"><I.Knife size={16} /></div><div><b>Free prep</b><span>Cleaned &amp; cut</span></div></div>
        <div className="m-trust-card"><div className="ic-wrap"><I.Clock size={16} /></div><div><b>Next-day</b><span>Across UAE</span></div></div>
        <div className="m-trust-card"><div className="ic-wrap"><I.Shield size={16} /></div><div><b>Money back</b><span>If not fresh</span></div></div>
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
        <Link className="btn btn-light btn-sm" href="/shop">Grab the deal <I.ArrowRight size={12} /></Link>
      </div>

      <div className="m-banner-stack">
        <a href="#" className="banner-card"><img src="/assets/banner-welcome.jpg" alt="15% off welcome" /></a>
        <a href="#" className="banner-card"><img src="/assets/banner-asian.jpg" alt="Asian snacks" /></a>
      </div>

      <div className="m-section">
        <div className="m-section-head"><h2>Popular today</h2><Link href="/shop">See more</Link></div>
        <div className="m-prod-grid">
          {PRODUCTS.slice(0, 4).map(p => <MProductCard key={p.id} product={p} />)}
        </div>
      </div>

      <div className="m-section"><div className="m-section-head"><h2>Shop by category</h2></div></div>
      <div className="m-cat-layout">
        <div className="m-cat-tabs">
          {CATEGORIES.slice(0, 6).map((c, i) => (
            <button key={i} className={activeCat === i ? 'active' : ''} onClick={() => setActiveCat(i)}>{c.name.split(' ')[0]}</button>
          ))}
        </div>
        <div className="m-cat-content">
          <div className="m-cat-pills">
            {pills.map(p => (
              <button key={p} className={activePill === p ? 'active' : ''} onClick={() => setActivePill(p)}>{p.charAt(0).toUpperCase() + p.slice(1)}</button>
            ))}
          </div>
          <div className="m-prod-grid">
            {PRODUCTS.slice(activeCat % 4, (activeCat % 4) + 4).map(p => <MProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>

      <div className="m-section">
        <div className="m-section-head"><h2>Trending</h2><Link href="/shop">See more</Link></div>
        <div className="m-prod-grid">{TRENDING.slice(0, 4).map(p => <MProductCard key={p.id} product={p} />)}</div>
      </div>

      <div className="m-section m-reviews">
        <div className="m-section-head"><h2>Loved by 12k+ households</h2></div>
        <div className="m-reviews-scroll">
          {REVIEWS.map((r, i) => (
            <div className="m-review-card" key={i}>
              <div className="stars">{[...Array(r.rating)].map((_, j) => <I.Star key={j} size={12} />)}</div>
              <p>&ldquo;{r.text}&rdquo;</p>
              <div className="meta">
                <div className="avatar">{r.name.charAt(0)}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{r.name}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--muted)' }}>{r.area}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="m-newsletter">
        <h3>Get 15% off your first order</h3>
        <p>Weekly deals, recipes &amp; new arrivals.</p>
        <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
          <input placeholder="your@email.com" type="email" required />
          <button className="btn btn-primary btn-sm">Join</button>
        </form>
      </div>
    </>
  );
}

// Pass-through used by mobile sub-pages — just renders children + bottom-nav padding container.
export function MobilePageBody({ children }: { children: React.ReactNode }) {
  return <div className="m-page-body">{children}</div>;
}
