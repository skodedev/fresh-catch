'use client';

import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { Shell } from '@/components/Shell';
import { I } from '@/components/icons';
import { allProducts } from '@/lib/data';
import { useStore } from '@/lib/store';

export default function WishlistPage() {
  const { wishlist } = useStore();
  const items = allProducts().filter(p => wishlist.includes(p.id));
  return (
    <Shell>
      <section className="container">
        <h1 style={{ margin: '0 0 8px' }}>Your wishlist</h1>
        <p style={{ color: 'var(--muted)', margin: '0 0 32px' }}>
          {items.length === 0 ? 'No saved items yet.' : `${items.length} saved item${items.length === 1 ? '' : 's'}.`}
        </p>
        {items.length === 0 ? (
          <Link className="btn btn-primary" href="/shop">Browse the shop <I.ArrowRight size={14} /></Link>
        ) : (
          <div className="prod-grid">
            {items.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </Shell>
  );
}
