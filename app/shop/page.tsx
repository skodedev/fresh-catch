'use client';

import React from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Shell } from '@/components/Shell';
import { allProducts } from '@/lib/data';

export default function ShopPage() {
  const [filter, setFilter] = React.useState('all');
  const [sort, setSort] = React.useState('featured');
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'fresh', label: 'Fresh' },
    { id: 'frozen', label: 'Frozen' },
    { id: 'live', label: 'Live' },
    { id: 'ready', label: 'Ready-to-eat' },
  ];
  const items = allProducts();
  const filtered = items.filter(p => {
    if (filter === 'all') return true;
    const c = (p.cat || '').toLowerCase();
    if (filter === 'fresh') return c.includes('fresh') || c.includes('local');
    if (filter === 'frozen') return c.includes('frozen');
    if (filter === 'live') return c.includes('live');
    if (filter === 'ready') return c.includes('ready');
    return true;
  });
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-low') return a.price - b.price;
    if (sort === 'price-high') return b.price - a.price;
    return 0;
  });
  return (
    <Shell>
      <section className="container listing">
        <header className="listing-head">
          <div>
            <span className="kicker">Shop</span>
            <h1>Today&apos;s catch</h1>
            <p>Hand-graded this morning. Delivered ice-cold across the UAE.</p>
          </div>
        </header>
        <div className="listing-toolbar">
          <div className="listing-filters">
            {filters.map(f => (
              <button key={f.id} className={filter === f.id ? 'active' : ''} onClick={() => setFilter(f.id)}>
                {f.label}
              </button>
            ))}
          </div>
          <select className="listing-sort" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </div>
        <div className="prod-grid">
          {sorted.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </Shell>
  );
}
