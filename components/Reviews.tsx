import { REVIEWS } from '@/lib/data';
import { I } from './icons';

export function Reviews() {
  return (
    <section className="reviews">
      <div className="container">
        <div className="review-headline">
          <div>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }}>Loved by 12,000+ households</h2>
            <p style={{ color: 'var(--muted)', margin: '8px 0 0', fontSize: 15 }}>The quality speaks for itself — but our customers love to talk about it.</p>
          </div>
          <div className="review-rating-big">
            <b>4.9</b>
            <div>
              <div className="rstars">{[...Array(5)].map((_, i) => <I.Star key={i} size={16} />)}</div>
              <small>Based on 12,438 verified reviews</small>
            </div>
          </div>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <div className="review-card" key={i}>
              <div className="review-stars">{[...Array(r.rating)].map((_, j) => <I.Star key={j} size={14} />)}</div>
              <p className="review-text">&ldquo;{r.text}&rdquo;</p>
              <div className="review-meta">
                <div className="review-avatar">{r.name.charAt(0)}</div>
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-area">{r.area} · Verified</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
