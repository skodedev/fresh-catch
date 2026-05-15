export function PromoStrip() {
  const items = [
    'Free delivery over AED 200',
    'Next-day delivery across UAE',
    'Hand-cut & prepped to order',
    '4.9★ from 12,000+ reviews',
    'Sustainably sourced — always',
  ];
  const list = [...items, ...items];
  return (
    <div className="promo-strip">
      <div className="promo-track">
        {list.map((t, i) => (
          <span key={i}>{t}<span className="dot" /></span>
        ))}
      </div>
    </div>
  );
}
