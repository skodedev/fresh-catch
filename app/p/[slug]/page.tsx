'use client';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import React from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Shell } from '@/components/Shell';
import { I } from '@/components/icons';
import { aed, allProducts, findProduct } from '@/lib/data';
import { useStore } from '@/lib/store';

export default function PDPPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const product = findProduct(slug);
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [qty, setQty] = React.useState(1);
  const [prep, setPrep] = React.useState('whole');

  if (!product) {
    return (
      <Shell>
        <section className="container pdp-missing">
          <h1>Product not found</h1>
          <p>That product may have sold out or moved.</p>
          <Link className="btn btn-primary" href="/shop">Browse the shop <I.ArrowRight size={14} /></Link>
        </section>
      </Shell>
    );
  }

  const inWishlist = wishlist.includes(product.id);
  const pct = product.was && product.price < product.was
    ? Math.round((1 - product.price / product.was) * 100) : null;
  const prepOptions = [
    { id: 'whole', label: 'Whole' },
    { id: 'scaled', label: 'Scaled & gutted' },
    { id: 'filleted', label: 'Filleted' },
    { id: 'steaks', label: 'Steaks' },
  ];
  const related = allProducts().filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 4);

  return (
    <Shell>
      <section className="container pdp">
        <nav className="pdp-crumbs">
          <Link href="/">Home</Link> <I.ChevronRight size={12} />
          <Link href="/shop">Shop</Link> <I.ChevronRight size={12} />
          <span>{product.name}</span>
        </nav>
        <div className="pdp-grid">
          <div className="pdp-gallery">
            {product.img && <img src={product.img} alt={product.name} />}
            {product.tag === 'LIVE' && <span className="prod-tag prod-tag-live">LIVE</span>}
          </div>
          <div className="pdp-body">
            <span className="pdp-cat">{product.cat}</span>
            <h1 className="pdp-title">{product.name}</h1>
            <div className="pdp-rating">
              <div className="rstars">{[...Array(5)].map((_, i) => <I.Star key={i} size={14} />)}</div>
              <span>4.9 · 128 reviews</span>
            </div>
            <div className="pdp-price-row">
              <span className="pdp-price">{aed(product.price)}</span>
              {product.was && <span className="pdp-was">{aed(product.was)}</span>}
              {pct != null && <span className="pdp-deal">−{pct}% off</span>}
            </div>
            <p className="pdp-desc">
              Hand-graded this morning at our docks. Sustainably sourced, vacuum-sealed, packed with gel-ice
              and delivered ice-cold across the UAE. VAT included.
            </p>
            <div className="pdp-section">
              <label>Preparation</label>
              <div className="pdp-pills">
                {prepOptions.map(o => (
                  <button key={o.id} className={prep === o.id ? 'active' : ''} onClick={() => setPrep(o.id)}>{o.label}</button>
                ))}
              </div>
            </div>
            <div className="pdp-section">
              <label>Quantity</label>
              <div className="pdp-qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}><I.Minus size={14} /></button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}><I.Plus size={14} /></button>
              </div>
            </div>
            <div className="pdp-cta-row">
              <button className="btn btn-primary" onClick={() => addToCart({ ...product, prep }, qty)}>
                <I.Plus size={14} /> Add to cart · {aed(product.price * qty)}
              </button>
              <button
                className={'btn btn-outline pdp-wish' + (inWishlist ? ' active' : '')}
                onClick={() => toggleWishlist(product.id)}
              >
                <I.Heart size={16} /> {inWishlist ? 'Saved' : 'Save'}
              </button>
            </div>
            <ul className="pdp-perks">
              <li><I.Truck size={14} /> Free delivery over AED 200 · next-day across UAE</li>
              <li><I.Shield size={14} /> Freshness guarantee — 100% money back</li>
              <li><I.Knife size={14} /> Free prepping to your spec</li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <div className="pdp-related">
            <h2>You may also like</h2>
            <div className="prod-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </section>
    </Shell>
  );
}
