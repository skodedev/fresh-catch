// Mock data — same shape as the static app's data.jsx

export type Product = {
  id: number;
  name: string;
  cat: string;
  price: number;
  was: number | null;
  tag: string | null;
  img: string;
  stockLeft?: number;
  prep?: string;
};

export type Category = {
  name: string;
  count: number;
  icon: string;
  img?: string;
};

export type Review = {
  name: string;
  area: string;
  rating: number;
  text: string;
};

export const CATEGORIES: Category[] = [
  { name: 'Classic Salmon & Tuna', count: 86, icon: 'Fish', img: '/assets/cat-classic.jpg' },
  { name: 'Live Lobster', count: 24, icon: 'Anchor', img: '/assets/cat-lobster.jpg' },
  { name: 'Frozen', count: 132, icon: 'Wave', img: '/assets/cat-frozen.jpg' },
  { name: 'Caviar & Roe', count: 18, icon: 'Sparkle', img: '/assets/cat-caviar.jpg' },
  { name: 'Imported', count: 42, icon: 'Compass', img: '/assets/cat-imported.jpg' },
  { name: 'Local Fish', count: 27, icon: 'Fish', img: '/assets/cat-local.jpg' },
  { name: 'Snacks', count: 31, icon: 'Bag', img: '/assets/cat-snacks.jpg' },
];

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Salmon Fillet', cat: 'Fresh • per 500g', price: 58, was: 65, tag: '11% OFF', img: '/assets/p-salmon-fillet.jpg', stockLeft: 4 },
  { id: 2, name: 'Salmon Roe — Imitation Caviar', cat: 'Per piece', price: 21, was: 26, tag: '19% OFF', img: '/assets/p-salmon-roe.jpg', stockLeft: 12 },
  { id: 3, name: 'Frozen Shrimp Cooked', cat: 'Frozen • per pack', price: 20, was: 24, tag: '17% OFF', img: '/assets/p-shrimp-cooked.jpg', stockLeft: 2 },
  { id: 4, name: 'Salmon Poke Bowl', cat: 'Ready-to-eat • per pack', price: 28, was: 32, tag: '13% OFF', img: '/assets/p-poke-bowl.jpg', stockLeft: 8 },
  { id: 5, name: 'Hamour Fillet', cat: 'Local catch • per 500g', price: 65, was: null, tag: null, img: '/assets/p-hamour.png', stockLeft: 6 },
  { id: 6, name: 'Live Lobster', cat: 'Live • per piece', price: 195, was: null, tag: 'LIVE', img: '/assets/p-lobster.png', stockLeft: 3 },
  { id: 7, name: 'Kingfish Steak', cat: 'Fresh • per 500g', price: 42, was: null, tag: null, img: '/assets/p-kingfish.png', stockLeft: 15 },
  { id: 8, name: 'Squid Tube — Frozen', cat: 'Frozen • per 1 kg', price: 20, was: 26, tag: '23% OFF', img: '/assets/squidtube.jpg', stockLeft: 5 },
];

export const TRENDING: Product[] = [
  { id: 21, name: 'Abrolhos Octopus (Raw Tentacles)', cat: 'Frozen • per 1kg', price: 145, was: null, tag: null, img: '/assets/p-abrolhos-octopus.jpg' },
  { id: 22, name: 'Black Mussels Full Shell', cat: 'Frozen • per pack', price: 20.5, was: null, tag: null, img: '/assets/p-mussels.jpg' },
  { id: 23, name: 'Cooked Octopus Tentacles', cat: 'Frozen • per pack', price: 170, was: null, tag: null, img: '/assets/p-octopus-tentacles.jpg' },
  { id: 24, name: 'Octopus Baby — Frozen', cat: 'Frozen • per 1kg', price: 24, was: null, tag: null, img: '/assets/p-octopus-baby.jpg' },
  { id: 25, name: 'Octopus Big (4–5kg)', cat: 'Frozen • per pack', price: 370, was: null, tag: null, img: '/assets/p-octopus.png' },
  { id: 26, name: 'Salad Shrimps — Frozen', cat: 'Frozen • per 1kg', price: 27, was: null, tag: null, img: '/assets/p-shrimps-pud.jpg' },
  { id: 27, name: 'Scallops Meat — Frozen', cat: 'Frozen • per 1kg', price: 98, was: null, tag: null, img: '/assets/p-scallops.jpg' },
  { id: 28, name: 'Sea Bass Fillet — Frozen', cat: 'Frozen • per 1kg', price: 78, was: 80, tag: '3% OFF', img: '/assets/p-seabass.png' },
  { id: 29, name: 'Sea Bream Fillet — Frozen', cat: 'Frozen • per 1kg', price: 58, was: null, tag: null, img: '/assets/p-sea-bream.png' },
  { id: 30, name: 'Nobashi Shrimp — Frozen', cat: 'Frozen • per pack', price: 65, was: null, tag: null, img: '/assets/p-nobashi.jpg' },
];

export const REVIEWS: Review[] = [
  { name: 'Aisha M.', area: 'Dubai Marina', rating: 5, text: "Genuinely the freshest seafood I've had delivered. The salmon arrived ice-cold, vacuum sealed, and tasted like it was caught that morning." },
  { name: 'Rohan P.', area: 'Downtown Dubai', rating: 5, text: 'Ordered the live lobsters for an anniversary dinner. They prepped them exactly how I asked and delivered next-day. Worth every dirham.' },
  { name: 'Layla A.', area: 'Jumeirah', rating: 5, text: "I've tried every fishmonger in the UAE. Nothing comes close to this quality. The smoked salmon is restaurant-grade." },
];

export const VAT_RATE = 0.05;
export const FREE_SHIPPING_THRESHOLD = 200;
export const SHIPPING_FLAT = 25;
export const COD_FEE = 5;
export const EMIRATES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'];

export function aed(n: number) { return 'AED ' + Number(n).toFixed(2); }
export function slugify(s: string) {
  return String(s).toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');
}
export function allProducts(): Product[] { return [...PRODUCTS, ...TRENDING]; }
export function findProduct(slug: string): Product | undefined {
  return allProducts().find(p => slugify(p.name) === slug);
}

export type CartItem = Product & { qty: number; prep?: string };

export function computeTotals(cart: CartItem[], opts: { paymentMethod?: string } = {}) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal === 0 ? 0 : (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT);
  const codFee = opts.paymentMethod === 'cod' ? COD_FEE : 0;
  const taxable = subtotal + shipping + codFee;
  const vat = +(taxable * VAT_RATE).toFixed(2);
  const total = +(taxable + vat).toFixed(2);
  return { subtotal, shipping, codFee, vat, total };
}
