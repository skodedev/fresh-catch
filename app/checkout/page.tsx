'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Shell } from '@/components/Shell';
import { I } from '@/components/icons';
import { aed, computeTotals, EMIRATES } from '@/lib/data';
import { useStore, type Order } from '@/lib/store';

function ReviewBlock({ label, children, onEdit }: { label: string; children: React.ReactNode; onEdit: () => void }) {
  return (
    <div className="review-block">
      <div className="rb-head">
        <b>{label}</b>
        <button className="rb-edit" onClick={onEdit}>Edit</button>
      </div>
      <div className="rb-body">{children}</div>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, placeOrder } = useStore();
  const [step, setStep] = React.useState(1);
  const [contact, setContact] = React.useState({ email: '', phone: '+971 ' });
  const [address, setAddress] = React.useState({
    name: '', emirate: 'Dubai', area: '', building: '', street: '',
    type: 'home', instructions: '',
  });
  const [slot, setSlot] = React.useState({ date: 'tomorrow', window: '09:00 – 11:00' });
  const [payment, setPayment] = React.useState('card');
  const [agreed, setAgreed] = React.useState(false);
  const totals = computeTotals(cart, { paymentMethod: payment });

  React.useEffect(() => { if (cart.length === 0) router.replace('/cart'); }, [cart.length, router]);

  const dates = [
    { id: 'tomorrow', label: 'Tomorrow', sub: 'Next-day · ice-packed' },
    { id: 'day-after', label: 'Day after', sub: 'Flexible' },
  ];
  const windows = ['09:00 – 11:00', '11:00 – 13:00', '15:00 – 17:00', '17:00 – 19:00'];
  const paymentOptions = [
    { id: 'card', label: 'Card', sub: 'Visa · Mastercard · Apple Pay', icon: 'Card' as const },
    { id: 'cod', label: 'Cash on Delivery', sub: '+ AED 5 handling', icon: 'Truck' as const },
    { id: 'tabby', label: 'Tabby — pay in 4', sub: '0% interest, no fees', icon: 'Sparkle' as const },
  ];

  const stepValid = () => {
    if (step === 1) return /\S+@\S+/.test(contact.email) && contact.phone.replace(/\D/g, '').length >= 12;
    if (step === 2) return address.name && address.area && address.building && address.street;
    if (step === 3) return slot.date && slot.window;
    if (step === 4) return !!payment;
    return true;
  };
  const next = () => stepValid() && setStep(s => Math.min(5, s + 1));
  const prev = () => setStep(s => Math.max(1, s - 1));

  const place = () => {
    if (!agreed) return;
    const order: Order = {
      id: 'FC-' + Date.now().toString(36).toUpperCase(),
      items: cart, contact, address, slot, payment,
      totals, createdAt: new Date().toISOString(),
      status: payment === 'cod' ? 'placed' : 'paid',
    };
    placeOrder(order);
    router.push(`/order/${order.id}`);
  };

  return (
    <Shell>
      <section className="container checkout">
        <h1>Checkout</h1>
        <div className="checkout-grid">
          <div className="checkout-main">
            <ol className="checkout-steps">
              {['Contact', 'Address', 'Delivery', 'Payment', 'Review'].map((label, i) => (
                <li key={label} className={(i + 1 === step ? 'active' : '') + (i + 1 < step ? ' done' : '')}>
                  <b>{i + 1}</b><span>{label}</span>
                </li>
              ))}
            </ol>

            {step === 1 && (
              <div className="checkout-card">
                <h2>Contact details</h2>
                <p className="muted">We&apos;ll send your invoice and delivery updates here.</p>
                <label className="field">
                  <span>Email</span>
                  <input type="email" required value={contact.email}
                    onChange={e => setContact({ ...contact, email: e.target.value })}
                    placeholder="you@example.com" />
                </label>
                <label className="field">
                  <span>UAE mobile</span>
                  <input type="tel" required value={contact.phone}
                    onChange={e => setContact({ ...contact, phone: e.target.value })}
                    placeholder="+971 5x xxx xxxx" />
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="checkout-card">
                <h2>Delivery address</h2>
                <label className="field">
                  <span>Full name</span>
                  <input value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} />
                </label>
                <div className="field-row">
                  <label className="field">
                    <span>Emirate</span>
                    <select value={address.emirate} onChange={e => setAddress({ ...address, emirate: e.target.value })}>
                      {EMIRATES.map(e => <option key={e}>{e}</option>)}
                    </select>
                  </label>
                  <label className="field">
                    <span>Area / neighbourhood</span>
                    <input value={address.area} onChange={e => setAddress({ ...address, area: e.target.value })}
                      placeholder="e.g. Dubai Marina" />
                  </label>
                </div>
                <div className="field-row">
                  <label className="field">
                    <span>Building / villa</span>
                    <input value={address.building} onChange={e => setAddress({ ...address, building: e.target.value })}
                      placeholder="Tower / villa name + #" />
                  </label>
                  <label className="field">
                    <span>Street</span>
                    <input value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} />
                  </label>
                </div>
                <label className="field">
                  <span>Delivery notes (optional)</span>
                  <input value={address.instructions} onChange={e => setAddress({ ...address, instructions: e.target.value })}
                    placeholder="Gate code, doorman, leave with concierge…" />
                </label>
                <div className="addr-type">
                  {['home', 'office', 'villa'].map(t => (
                    <button key={t} className={address.type === t ? 'active' : ''}
                      onClick={() => setAddress({ ...address, type: t })}>{t}</button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="checkout-card">
                <h2>Delivery slot</h2>
                <p className="muted">All orders ship in insulated boxes with gel-ice.</p>
                <div className="slot-dates">
                  {dates.map(d => (
                    <button key={d.id} className={slot.date === d.id ? 'active' : ''}
                      onClick={() => setSlot({ ...slot, date: d.id })}>
                      <b>{d.label}</b><small>{d.sub}</small>
                    </button>
                  ))}
                </div>
                <div className="slot-windows">
                  {windows.map(w => (
                    <button key={w} className={slot.window === w ? 'active' : ''}
                      onClick={() => setSlot({ ...slot, window: w })}>{w}</button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="checkout-card">
                <h2>Payment</h2>
                <div className="pay-list">
                  {paymentOptions.map(o => {
                    const Ic = I[o.icon];
                    return (
                      <label key={o.id} className={'pay-item' + (payment === o.id ? ' active' : '')}>
                        <input type="radio" name="pay" checked={payment === o.id} onChange={() => setPayment(o.id)} />
                        <div className="pay-ic"><Ic size={18} /></div>
                        <div className="pay-text"><b>{o.label}</b><small>{o.sub}</small></div>
                        <I.Check size={14} className="pay-check" />
                      </label>
                    );
                  })}
                </div>
                {payment === 'card' && (
                  <div className="card-fields">
                    <label className="field"><span>Card number</span><input placeholder="4242 4242 4242 4242" /></label>
                    <div className="field-row">
                      <label className="field"><span>Expiry</span><input placeholder="MM / YY" /></label>
                      <label className="field"><span>CVC</span><input placeholder="123" /></label>
                    </div>
                    <small className="muted"><I.Shield size={11} /> Encrypted. We never store full card details.</small>
                  </div>
                )}
              </div>
            )}

            {step === 5 && (
              <div className="checkout-card">
                <h2>Review your order</h2>
                <ReviewBlock label="Contact" onEdit={() => setStep(1)}>
                  {contact.email}<br />{contact.phone}
                </ReviewBlock>
                <ReviewBlock label="Deliver to" onEdit={() => setStep(2)}>
                  <b>{address.name}</b><br />
                  {address.building}, {address.street}<br />
                  {address.area}, {address.emirate}
                  {address.instructions && <><br /><small>{address.instructions}</small></>}
                </ReviewBlock>
                <ReviewBlock label="Slot" onEdit={() => setStep(3)}>
                  {slot.date === 'tomorrow' ? 'Tomorrow' : 'Day after'} · {slot.window}
                </ReviewBlock>
                <ReviewBlock label="Payment" onEdit={() => setStep(4)}>
                  {paymentOptions.find(p => p.id === payment)?.label}
                </ReviewBlock>
                <label className="terms">
                  <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                  <span>I agree to the <a href="#">terms of sale</a> and confirm I&apos;m at the delivery address for the slot above.</span>
                </label>
              </div>
            )}

            <div className="checkout-nav">
              {step > 1 && <button className="btn btn-outline" onClick={prev}>Back</button>}
              {step < 5 && <button className="btn btn-primary" onClick={next} disabled={!stepValid()}>Continue <I.ArrowRight size={14} /></button>}
              {step === 5 && (
                <button className="btn btn-primary" onClick={place} disabled={!agreed}>
                  Place order · {aed(totals.total)}
                </button>
              )}
            </div>
          </div>

          <aside className="checkout-summary">
            <h3>Order summary</h3>
            <div className="sum-items">
              {cart.map(it => (
                <div className="sum-row" key={it.id + ':' + (it.prep || '')}>
                  <div className="sum-thumb">{it.img && <img src={it.img} alt={it.name} />}</div>
                  <div className="sum-info">
                    <span>{it.name}</span>
                    <small>Qty {it.qty}{it.prep ? ' · ' + it.prep : ''}</small>
                  </div>
                  <div className="sum-price">{aed(it.price * it.qty)}</div>
                </div>
              ))}
            </div>
            <div className="sum-totals">
              <div className="row"><span>Subtotal</span><span>{aed(totals.subtotal)}</span></div>
              <div className="row"><span>Shipping</span><span>{totals.shipping === 0 ? 'Free' : aed(totals.shipping)}</span></div>
              {totals.codFee > 0 && <div className="row"><span>COD handling</span><span>{aed(totals.codFee)}</span></div>}
              <div className="row"><span>VAT (5%)</span><span>{aed(totals.vat)}</span></div>
              <div className="row total"><span>Total</span><span>{aed(totals.total)}</span></div>
            </div>
          </aside>
        </div>
      </section>
    </Shell>
  );
}
