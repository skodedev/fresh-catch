'use client';

import React from 'react';
import type { Product } from '@/lib/data';
import { ProductCard } from './ProductCard';
import { I } from './icons';

export function DealOfTheDay({ products }: { products: Product[] }) {
  // Countdown to end-of-day local time
  const targetRef = React.useRef<number | null>(null);
  if (targetRef.current == null) {
    const t = new Date(); t.setHours(23, 59, 59, 999);
    targetRef.current = t.getTime();
  }
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  let diff = Math.max(0, targetRef.current - now);
  const hh = String(Math.floor(diff / 3600000)).padStart(2, '0');
  diff -= Number(hh) * 3600000;
  const mm = String(Math.floor(diff / 60000)).padStart(2, '0');
  diff -= Number(mm) * 60000;
  const ss = String(Math.floor(diff / 1000)).padStart(2, '0');

  const items = products || [];
  const VISIBLE = 4;
  const pageCount = Math.max(1, Math.ceil(items.length / VISIBLE));
  const [page, setPage] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (paused || pageCount <= 1) return;
    const id = setInterval(() => setPage(p => (p + 1) % pageCount), 3500);
    return () => clearInterval(id);
  }, [paused, pageCount]);

  return (
    <section className="dod">
      <div className="container dod-container">
        <aside className="dod-side">
          <span className="dod-eyebrow"><I.Flame size={13} /> Limited time</span>
          <h2 className="dod-title">Deal of the Day</h2>
          <p className="dod-sub">Our biggest discounts on best-sellers. Refreshes at midnight — don&apos;t miss out.</p>
          <div className="dod-timer" aria-label="Time left">
            <div className="dod-timer-label">Ends in</div>
            <div className="dod-timer-digits">
              <div className="dod-timer-cell"><b>{hh}</b><span>hrs</span></div>
              <em>:</em>
              <div className="dod-timer-cell"><b>{mm}</b><span>min</span></div>
              <em>:</em>
              <div className="dod-timer-cell"><b>{ss}</b><span>sec</span></div>
            </div>
          </div>
          <div className="dod-dots" role="tablist">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button key={i} className={'dod-dot' + (i === page ? ' active' : '')}
                onClick={() => setPage(i)} aria-label={`Page ${i + 1}`} />
            ))}
          </div>
        </aside>
        <div className="dod-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="dod-track" style={{ transform: `translateX(-${page * 100}%)` }}>
            {Array.from({ length: pageCount }).map((_, p) => (
              <div className="dod-page" key={p}>
                {items.slice(p * VISIBLE, p * VISIBLE + VISIBLE).map(prod => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
