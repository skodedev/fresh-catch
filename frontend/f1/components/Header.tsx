'use client';

import Link from 'next/link';
import React from 'react';
import { useStore } from '@/lib/store';
import { I } from './icons';

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

export function Header() {
  const { city, setCity, cartCount, wishlist, setCartOpen, setSearchOpen } = useStore();
  const [scrolled, setScrolled] = React.useState(false);
  const [cityOpen, setCityOpen] = React.useState(false);
  const [locating, setLocating] = React.useState(false);
  const cityRef = React.useRef<HTMLDivElement>(null);

  const handleLocate = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        let best = CENTERS[0], bestD = Infinity;
        for (const c of CENTERS) {
          const dx = c.lat - latitude, dy = c.lng - longitude;
          const d = dx * dx + dy * dy;
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
    const onDoc = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setCityOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <header className={'site-header' + (scrolled ? ' scrolled' : '')}>
      <div className="header-inner">
        <Link href="/" className="brand">
          <img src="/assets/freshcatch-logo.svg" alt="Freshcatch" style={{ height: 32, width: 'auto', display: 'block' }} />
        </Link>
        <nav className="nav-row">
          <Link href="/shop" className="active">Shop</Link>
          <Link href="/shop">Today&apos;s catch</Link>
          <Link href="/shop">Sushi grade</Link>
          <Link href="/shop">Live</Link>
          <Link href="/">Recipes</Link>
          <Link href="/">Our story</Link>
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
          <button className="icon-btn" onClick={() => setSearchOpen(true)}><I.Search /></button>
          <Link className="icon-btn" href="/account"><I.User /></Link>
          <Link className="icon-btn" href="/wishlist">
            <I.Heart />
            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </Link>
          <button className="icon-btn" onClick={() => setCartOpen(true)}>
            <I.Cart />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
