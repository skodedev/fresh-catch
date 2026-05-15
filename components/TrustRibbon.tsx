import { I } from './icons';

export function TrustRibbon() {
  const items = [
    { ic: 'Truck', title: 'Free delivery', sub: 'On orders above AED 200' },
    { ic: 'Knife', title: 'Free prepping', sub: 'Cleaned, scaled, filleted' },
    { ic: 'Clock', title: 'Next-day arrival', sub: 'Across all 7 emirates' },
    { ic: 'Shield', title: 'Freshness guarantee', sub: '100% money back' },
  ] as const;
  return (
    <section className="trust-ribbon">
      <div className="trust-ribbon-inner">
        {items.map((item, i) => {
          const Ic = (I as Record<string, React.FC<{ size?: number }>>)[item.ic];
          return (
            <div className="trust-item" key={i}>
              <div className="ic-wrap"><Ic size={18} /></div>
              <div>
                <b>{item.title}</b>
                <span>{item.sub}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
