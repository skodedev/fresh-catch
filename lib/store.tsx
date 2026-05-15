'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { CartItem, Product } from './data';

export type Order = {
  id: string;
  items: CartItem[];
  contact: { email: string; phone: string };
  address: {
    name: string; emirate: string; area: string; building: string; street: string;
    type: string; instructions: string;
  };
  slot: { date: string; window: string };
  payment: string;
  totals: { subtotal: number; shipping: number; codFee: number; vat: number; total: number };
  status: 'placed' | 'paid' | 'packed' | 'out' | 'delivered';
  createdAt: string;
};

type StoreContextValue = {
  cart: CartItem[];
  wishlist: number[];
  orders: Order[];
  city: string | null;
  setCity: (c: string | null) => void;
  cartCount: number;
  addToCart: (product: Product & { prep?: string }, qty?: number) => void;
  updateQty: (id: number, qty: number) => void;
  toggleWishlist: (id: number) => void;
  placeOrder: (order: Order) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  toast: { show: boolean; msg: string };
  showToast: (msg: string) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function useLocalStorageState<T>(key: string, initial: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [val, setVal] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);
  // Read on mount (client only)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw != null) setVal(JSON.parse(raw) as T);
    } catch { /* noop */ }
    setHydrated(true);
  }, [key]);
  // Write whenever val changes (post-hydration)
  useEffect(() => {
    if (!hydrated) return;
    try { window.localStorage.setItem(key, JSON.stringify(val)); } catch { /* noop */ }
  }, [key, val, hydrated]);
  return [val, setVal];
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useLocalStorageState<CartItem[]>('fc:cart', []);
  const [wishlist, setWishlist] = useLocalStorageState<number[]>('fc:wishlist', []);
  const [orders, setOrders] = useLocalStorageState<Order[]>('fc:orders', []);
  const [city, setCity] = useLocalStorageState<string | null>('fc:city', null);

  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });

  const showToast = useCallback((msg: string) => {
    setToast({ show: true, msg });
    window.setTimeout(() => setToast({ show: false, msg: '' }), 1800);
  }, []);

  const addToCart = useCallback((product: Product & { prep?: string }, qty: number = 1) => {
    const key = product.id + ':' + (product.prep || '');
    setCart(prev => {
      const found = prev.find(i => (i.id + ':' + (i.prep || '')) === key);
      if (found) return prev.map(i => (i.id + ':' + (i.prep || '')) === key ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
    showToast(`Added ${product.name}`);
  }, [setCart, showToast]);

  const updateQty = useCallback((id: number, qty: number) => {
    if (qty <= 0) setCart(prev => prev.filter(i => i.id !== id));
    else setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, [setCart]);

  const toggleWishlist = useCallback((id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, [setWishlist]);

  const placeOrder = useCallback((order: Order) => {
    setOrders(prev => [...prev, order]);
    setCart([]);
  }, [setOrders, setCart]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const value: StoreContextValue = {
    cart, wishlist, orders, city, setCity, cartCount,
    addToCart, updateQty, toggleWishlist, placeOrder,
    cartOpen, setCartOpen, searchOpen, setSearchOpen, toast, showToast,
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}
