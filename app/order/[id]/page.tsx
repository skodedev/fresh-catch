'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Shell } from '@/components/Shell';
import { I } from '@/components/icons';
import { aed } from '@/lib/data';
import { useStore } from '@/lib/store';

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  const { orders } = useStore();
  const order = orders.find(o => o.id === params.id);

  if (!order) {
    return (
      <Shell>
        <section className="container">
          <h1>Order not found</h1>
          <Link className="btn btn-primary" href="/">Back home</Link>
        </section>
      </Shell>
    );
  }

  const steps = [
    { id: 'placed', label: 'Order placed' },
    { id: 'packed', label: 'Packed with gel-ice' },
    { id: 'out', label: 'Out for delivery' },
    { id: 'delivered', label: 'Delivered' },
  ];
  const currentIdx = order.status === 'delivered' ? 3 : 1;

  return (
    <Shell>
      <section className="container order-page">
        <div className="order-hero">
          <I.Check size={36} className="ic" />
          <h1>Thank you, your order is confirmed</h1>
          <p>Order ID <b>{order.id}</b> · A receipt has been sent to {order.contact.email}.</p>
        </div>

        <div className="order-grid">
          <div>
            <div className="order-card">
              <h2>Delivery</h2>
              <div className="muted">
                <b>{order.address.name}</b><br />
                {order.address.building}, {order.address.street}<br />
                {order.address.area}, {order.address.emirate}<br />
                {order.contact.phone}
              </div>
              <div style={{ marginTop: 14 }}>
                <b>Arriving</b> {order.slot.date === 'tomorrow' ? 'tomorrow' : 'day after'} · {order.slot.window}
              </div>
            </div>
            <div className="order-card">
              <h2>Status</h2>
              <ol className="order-steps">
                {steps.map((s, i) => (
                  <li key={s.id} className={i <= currentIdx ? 'done' : ''}>
                    <span className="dot">{i <= currentIdx ? <I.Check size={12} /> : i + 1}</span>
                    <span>{s.label}</span>
                  </li>
                ))}
              </ol>
              <small className="muted"><I.WhatsApp size={11} /> You&apos;ll get WhatsApp updates at each step.</small>
            </div>
          </div>

          <div className="order-card">
            <h2>Items</h2>
            <div className="sum-items">
              {order.items.map(it => (
                <div className="sum-row" key={it.id + ':' + (it.prep || '')}>
                  <div className="sum-thumb">{it.img && <img src={it.img} alt={it.name} />}</div>
                  <div className="sum-info"><span>{it.name}</span><small>Qty {it.qty}{it.prep ? ' · ' + it.prep : ''}</small></div>
                  <div className="sum-price">{aed(it.price * it.qty)}</div>
                </div>
              ))}
            </div>
            <div className="sum-totals" style={{ marginTop: 18 }}>
              <div className="row"><span>Subtotal</span><span>{aed(order.totals.subtotal)}</span></div>
              <div className="row"><span>Shipping</span><span>{order.totals.shipping === 0 ? 'Free' : aed(order.totals.shipping)}</span></div>
              {order.totals.codFee > 0 && <div className="row"><span>COD handling</span><span>{aed(order.totals.codFee)}</span></div>}
              <div className="row"><span>VAT (5%)</span><span>{aed(order.totals.vat)}</span></div>
              <div className="row total"><span>Total paid</span><span>{aed(order.totals.total)}</span></div>
            </div>
            <Link className="btn btn-outline" href="/account/orders" style={{ marginTop: 16 }}>View all orders <I.ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
