'use client';

import React from 'react';
import Link from 'next/link';
import { PRODUCTS, slugify } from '@/lib/data';
import { useStore } from '@/lib/store';
import { I } from './icons';

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = React.useState('');
  React.useEffect(() => {
    if (searchOpen) window.setTimeout(() => document.getElementById('search-input')?.focus(), 100);
  }, [searchOpen]);
  const trending = ['Salmon fillet', 'King crab', 'Yellowfin tuna', 'Live lobster', 'Beluga caviar', 'Hamachi'];
  const results = q ? PRODUCTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase())) : [];
  const close = () => setSearchOpen(false);
  return (
    <div className={'search-overlay' + (searchOpen ? ' open' : '')} onClick={close}>
      <button className="search-close" onClick={close}><I.X /></button>
      <div className="search-overlay-inner" onClick={e => e.stopPropagation()}>
        <input id="search-input" placeholder="Search for fish, prawns, recipes…" value={q} onChange={e => setQ(e.target.value)} />
        <div className="search-suggestions">
          {q ? (
            results.length === 0 ? <span style={{ color: 'rgba(255,255,255,0.5)', padding: 24 }}>No matches.</span> :
              results.map(r => (
                <Link key={r.id} href={`/p/${slugify(r.name)}`} onClick={close}><span>{r.name}</span><small>AED {r.price}</small></Link>
              ))
          ) : (
            <>
              <small style={{ color: 'rgba(255,255,255,0.5)', padding: '12px 0' }}>TRENDING</small>
              {trending.map(t => (
                <a key={t} href="#"><span>{t}</span><I.ArrowRight size={14} /></a>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
