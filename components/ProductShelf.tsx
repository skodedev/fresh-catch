'use client';

import React from 'react';
import type { Product } from '@/lib/data';
import { ProductCard } from './ProductCard';

export function ProductShelf({ title, subtitle, products }: { title: string; subtitle?: string; products: Product[] }) {
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
        {products.slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
