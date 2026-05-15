'use client';

import Link from 'next/link';
import React from 'react';
import type { Product } from '@/lib/data';
import { slugify } from '@/lib/data';
import { useStore } from '@/lib/store';
import { I } from './icons';
import { StockPill } from './StockPill';

export function MProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const [added, setAdded] = React.useState(false);
  const pct = product.was && product.price < product.was
    ? Math.round((1 - product.price / product.was) * 100) : null;
  const handleAdd: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault(); e.stopPropagation();
    addToCart(product); setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };
  return (
    <Link href={`/p/${slugify(product.name)}`} className="m-prod-card">
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
    </Link>
  );
}
