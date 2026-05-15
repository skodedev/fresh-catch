'use client';

import Link from 'next/link';
import React from 'react';
import { useStore } from '@/lib/store';
import { Fab } from './Fab';
import { Footer } from './Footer';
import { Header } from './Header';
import { I } from './icons';
import { MobilePageBody } from './MobileHome';
import { PromoStrip } from './PromoStrip';

/**
 * Shell wraps every page route with the desktop chrome AND the mobile chrome.
 * CSS (.desktop-only / .mobile-only) decides which one is visible.
 *
 * mode = "home" → mobile path renders the bespoke MobileHome (passed via mobileHome prop)
 * mode = "sub"  → mobile path renders {children} inside a sub-page mobile chrome
 */
export function Shell({
  children,
  mobileHome,
}: {
  children: React.ReactNode;
  mobileHome?: React.ReactNode;
}) {
  const { setCartOpen, setSearchOpen, cartCount } = useStore();
  const isHome = !!mobileHome;

  return (
    <>
      {/* Desktop */}
      <div className="desktop-only">
        <PromoStrip />
        <Header />
        {children}
        <Footer />
        <Fab />
      </div>

      {/* Mobile */}
      <div className="mobile-only">
        <div className="mobile-frame">
          {isHome ? (
            // Mobile home: full custom header with greeting + search bar
            <>
              <div className="m-header" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <img src="/assets/freshcatch-logo.svg" alt="Freshcatch" style={{ height: 22, width: 'auto' }} />
                  <div className="m-header-actions">
                    <button className="m-icon-btn"><I.Bell size={16} /></button>
                    <button className="m-icon-btn" onClick={() => setCartOpen(true)}>
                      <I.Bag size={16} />
                      {cartCount > 0 && <span className="badge">{cartCount}</span>}
                    </button>
                  </div>
                </div>
                <div className="m-greeting">
                  <small>Deliver to</small>
                  <b style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <I.MapPin size={13} /> Dubai Marina <I.ChevronDown size={12} />
                  </b>
                </div>
              </div>
              <div className="m-search-bar" onClick={() => setSearchOpen(true)}>
                <I.Search size={16} />
                <span style={{ flex: 1 }}>Search for fresh fish, prawns…</span>
                <I.Sliders size={16} />
              </div>
              {mobileHome}
            </>
          ) : (
            // Mobile sub-page: compact header with back arrow
            <>
              <div className="m-header m-header-sub">
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--ink)', textDecoration: 'none' }}>
                  <I.ArrowLeft size={16} /><span style={{ fontSize: 14, fontWeight: 600 }}>Back</span>
                </Link>
                <img src="/assets/freshcatch-logo.svg" alt="Freshcatch" style={{ height: 18, width: 'auto' }} />
                <button className="m-icon-btn" onClick={() => setCartOpen(true)}>
                  <I.Bag size={16} />
                  {cartCount > 0 && <span className="badge">{cartCount}</span>}
                </button>
              </div>
              <MobilePageBody>{children}</MobilePageBody>
            </>
          )}

          <nav className="m-bottom-nav">
            <Link href="/" className="m-nav-btn"><I.Home size={20} /><span>Home</span></Link>
            <Link href="/shop" className="m-nav-btn"><I.Grid size={20} /><span>Shop</span></Link>
            <button className="m-nav-btn center" onClick={() => setSearchOpen(true)}>
              <div className="icon-circle"><I.Search size={20} /></div>
            </button>
            <Link href="/wishlist" className="m-nav-btn"><I.Heart size={20} /><span>Saved</span></Link>
            <Link href="/account" className="m-nav-btn"><I.User size={20} /><span>Profile</span></Link>
          </nav>
        </div>
      </div>
    </>
  );
}
