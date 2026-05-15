'use client';

import Link from 'next/link';
import React from 'react';
import type { Product } from '@/lib/data';
import { slugify } from '@/lib/data';
import { useStore } from '@/lib/store';
import { I } from './icons';
import { StockPill } from './StockPill';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const [added, setAdded] = React.useState(false);
  const pct = product.was && product.price < product.was
    ? Math.round((1 - product.price / product.was) * 100) : null;
  const href = `/p/${slugify(product.name)}`;

  const handleAdd: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <Link href={href} className="prod-card">
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
    </Link>
  );
}
