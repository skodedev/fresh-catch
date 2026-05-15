'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { Shell } from '@/components/Shell';
import { I } from '@/components/icons';
import { aed, allProducts } from '@/lib/data';
import { useStore } from '@/lib/store';

export default function AccountPage() {
  const params = useParams<{ section?: string[] }>();
  const section = params.section?.[0] || 'orders';
  const { orders, wishlist } = useStore();

  return (
    <Shell>
      <section className="container account">
        <aside className="account-nav">
          <h3>My account</h3>
          <Link href="/account/orders" className={section === 'orders' ? 'active' : ''}><I.Receipt size={14} /> Orders</Link>
          <Link href="/account/addresses" className={section === 'addresses' ? 'active' : ''}><I.MapPin size={14} /> Addresses</Link>
          <Link href="/account/wishlist" className={section === 'wishlist' ? 'active' : ''}><I.Heart size={14} /> Wishlist</Link>
          <Link href="/account/profile" className={section === 'profile' ? 'active' : ''}><I.User size={14} /> Profile</Link>
        </aside>
        <div className="account-main">
          {section === 'orders' && (
            orders.length === 0 ? (
              <div className="account-empty">
                <I.Receipt size={32} />
                <h2>No orders yet</h2>
                <p>Your past orders will appear here.</p>
                <Link className="btn btn-primary" href="/shop">Start shopping <I.ArrowRight size={14} /></Link>
              </div>
            ) : (
              <div>
                <h2>Orders</h2>
                <div className="order-list">
                  {[...orders].reverse().map(o => (
                    <Link className="order-card-row" href={`/order/${o.id}`} key={o.id}>
                      <div>
                        <b>{o.id}</b>
                        <small>{new Date(o.createdAt).toLocaleDateString()} · {o.items.length} item{o.items.length === 1 ? '' : 's'}</small>
                      </div>
                      <div>{aed(o.totals.total)}</div>
                      <div className={'pill status status-' + (o.status || 'placed')}>{o.status}</div>
                      <I.ChevronRight size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            )
          )}
          {section === 'addresses' && (
            <div className="account-empty">
              <I.MapPin size={32} />
              <h2>No saved addresses</h2>
              <p>Save addresses at checkout to reuse them later.</p>
            </div>
          )}
          {section === 'wishlist' && (
            <div>
              <h2>Wishlist</h2>
              {wishlist.length === 0 ? (
                <p className="muted">No saved items yet.</p>
              ) : (
                <div className="prod-grid">
                  {allProducts().filter(p => wishlist.includes(p.id)).map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              )}
            </div>
          )}
          {section === 'profile' && (
            <div className="account-empty">
              <I.User size={32} />
              <h2>Guest mode</h2>
              <p>You&apos;re checking out as a guest. Sign-in coming soon.</p>
            </div>
          )}
        </div>
      </section>
    </Shell>
  );
}
