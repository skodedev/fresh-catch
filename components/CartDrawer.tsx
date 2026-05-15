'use client';

import Link from 'next/link';
import { useStore } from '@/lib/store';
import { I } from './icons';

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, updateQty } = useStore();
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 200 ? 0 : 25;
  const total = subtotal + shipping;
  const close = () => setCartOpen(false);

  return (
    <>
      <div className={'drawer-backdrop' + (cartOpen ? ' open' : '')} onClick={close} />
      <aside className={'drawer' + (cartOpen ? ' open' : '')}>
        <div className="drawer-head">
          <h3>Your basket ({cart.length})</h3>
          <button className="icon-btn" onClick={close}><I.X /></button>
        </div>
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="drawer-empty">
              <I.Cart size={36} />
              <h4>Your basket is empty</h4>
              <p>Add fresh seafood to get started.</p>
            </div>
          ) : (
            cart.map(item => (
              <div className="drawer-row" key={item.id + ':' + (item.prep || '')}>
                <div className="drawer-thumb">
                  {item.img && <img src={item.img} alt={item.name} />}
                </div>
                <div className="drawer-info">
                  <h5>{item.name}</h5>
                  <small>{item.cat}</small>
                  <div className="qty">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}><I.Minus size={12} /></button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}><I.Plus size={12} /></button>
                  </div>
                </div>
                <div className="drawer-price">AED {item.price * item.qty}</div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="drawer-foot">
            <div className="drawer-totals">
              <div className="row"><span>Subtotal</span><span>AED {subtotal}</span></div>
              <div className="row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : 'AED ' + shipping}</span></div>
              <div className="row total"><span>Total</span><span>AED {total}</span></div>
            </div>
            <Link className="btn btn-primary" href="/checkout" onClick={close} style={{ width: '100%', justifyContent: 'center' }}>
              Checkout <I.ArrowRight size={14} />
            </Link>
            <Link className="btn btn-outline" href="/cart" onClick={close} style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
              View full basket
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
