import Link from 'next/link';
import { CATEGORIES } from '@/lib/data';
import { I } from './icons';

export function Categories() {
  return (
    <section className="container">
      <div className="section-head">
        <div>
          <h2>Choose &amp; enjoy</h2>
          <p>Every category sourced from a trusted partner — chef-vetted, quality controlled.</p>
        </div>
        <Link className="link-arrow" href="/shop">All categories <I.ArrowRight size={14} /></Link>
      </div>
      <div className="cat-grid">
        {CATEGORIES.map((c, i) => {
          const Icon = (I as Record<string, React.FC<{ size?: number }>>)[c.icon] || I.Fish;
          return (
            <Link className="cat-cell" href="/shop" key={i}>
              <div className="img-wrap">
                {c.img
                  ? <img src={c.img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                  : <Icon size={26} />}
              </div>
              <h3>{c.name}</h3>
              <div className="count">{c.count} items</div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
