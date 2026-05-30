import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  size: number;
  qty: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (id: string, size: number, qty?: number) => void;
  updateQty: (id: string, size: number, qty: number) => void;
  removeFromCart: (id: string, size: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
}

const StoreContext = createContext<StoreState | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => read("flexrun_cart", []));
  const [wishlist, setWishlist] = useState<string[]>(() => read("flexrun_wishlist", []));

  useEffect(() => {
    localStorage.setItem("flexrun_cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("flexrun_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const value = useMemo<StoreState>(
    () => ({
      cart,
      wishlist,
      addToCart: (id, size, qty = 1) =>
        setCart((prev) => {
          const existing = prev.find((i) => i.id === id && i.size === size);
          if (existing) return prev.map((i) => (i === existing ? { ...i, qty: i.qty + qty } : i));
          return [...prev, { id, size, qty }];
        }),
      updateQty: (id, size, qty) =>
        setCart((prev) =>
          prev
            .map((i) => (i.id === id && i.size === size ? { ...i, qty } : i))
            .filter((i) => i.qty > 0),
        ),
      removeFromCart: (id, size) =>
        setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size))),
      clearCart: () => setCart([]),
      toggleWishlist: (id) =>
        setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
      isWishlisted: (id) => wishlist.includes(id),
    }),
    [cart, wishlist],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};