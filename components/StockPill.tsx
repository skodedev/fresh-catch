import { I } from './icons';

export function StockPill({ count }: { count?: number }) {
  if (count == null) return null;
  if (count <= 5) return <div className="prod-stock low"><I.Flame size={11} /> Only {count} left</div>;
  if (count <= 10) return <div className="prod-stock med">Selling fast</div>;
  return null;
}
