'use client';

import Link from 'next/link';
import { Shell } from '@/components/Shell';
import { I } from '@/components/icons';
import { aed, computeTotals } from '@/lib/data';
import { useStore } from '@/lib/store';

export default function CartPage() {
  const { cart, updateQty } = useStore();
  const totals = computeTotals(cart);
  return (
    <Shell>
      <section className="container cart-page">
        <h1>Your basket</h1>
        {cart.length === 0 ? (
          <div className="cart-empty">
            <I.Cart size={48} />
            <h2>Your basket is empty</h2>
            <p>Add fresh seafood to get started.</p>
            <Link className="btn btn-primary" href="/shop">Browse the shop <I.ArrowRight size={14} /></Link>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="cart-items">
              {cart.map(item => (
                <div className="cart-row" key={item.id + ':' + (item.prep || '')}>
                  <div className="cart-thumb">
                    {item.img && <img src={item.img} alt={item.name} />}
                  </div>
                  <div className="cart-info">
                    <h3>{item.name}</h3>
                    <small>{item.cat}{item.prep ? ' · ' + item.prep : ''}</small>
                    <div className="cart-qty">
                      <button onClick={() => updateQty(item.id, item.qty - 1)}><I.Minus size={12} /></button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}><I.Plus size={12} /></button>
                      <button className="cart-remove" onClick={() => updateQty(item.id, 0)}><I.X size={12} /> Remove</button>
                    </div>
                  </div>
                  <div className="cart-line-price">{aed(item.price * item.qty)}</div>
                </div>
              ))}
            </div>
            <aside className="cart-summary">
              <h3>Order summary</h3>
              <div className="row"><span>Subtotal</span><span>{aed(totals.subtotal)}</span></div>
              <div className="row"><span>Shipping</span><span>{totals.shipping === 0 ? 'Free' : aed(totals.shipping)}</span></div>
              <div className="row"><span>VAT (5%)</span><span>{aed(totals.vat)}</span></div>
              <div className="row total"><span>Total</span><span>{aed(totals.total)}</span></div>
              <Link className="btn btn-primary" href="/checkout" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
                Checkout <I.ArrowRight size={14} />
              </Link>
              <small className="cart-note">
                <I.Shield size={11} /> Freshness guaranteed · VAT included on invoice
              </small>
            </aside>
          </div>
        )}
      </section>
    </Shell>
  );
}
