'use client';

import { I } from './icons';

export function Newsletter() {
  return (
    <section className="newsletter">
      <div className="container">
        <h2>Get 15% off your first catch</h2>
        <p>Join the Tideline crew for weekly deals, new arrivals, and chef recipes — straight to your inbox.</p>
        <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
          <input type="email" placeholder="your@email.com" required />
          <button className="btn">Subscribe <I.ArrowRight size={14} /></button>
        </form>
        <div className="newsletter-perks">
          <span><I.Check size={12} /> Exclusive deals</span>
          <span><I.Check size={12} /> Chef recipes</span>
          <span><I.Check size={12} /> No spam, ever</span>
        </div>
      </div>
    </section>
  );
}
