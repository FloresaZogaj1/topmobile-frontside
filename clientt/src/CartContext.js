// src/CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
const STORAGE_KEY = "tm_cart";

/* Slug helper (si në backend) */
const slugify = (s) =>
  String(s ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

/* Normalizo id: nëse s’është slug i pastër → kthe slug (ose nga emri) */
const normalizeId = (raw, fallbackName) => {
  const s = String(raw ?? "").trim();
  const fromRaw = slugify(s);
  if (fromRaw) return fromRaw;
  const fromName = slugify(fallbackName ?? "produkt");
  return fromName || String(Date.now());
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const safeId = normalizeId(
      product?.id ?? product?.productId ?? product?.product_id ?? product?.sku ?? product?.slug ?? product?.code ?? product?._id,
      product?.name ?? product?.title
    );
    const safePrice = Number(product.price ?? 0);

    setCart((prev) => {
      const exists = prev.find((p) => String(p.id) === String(safeId));
      if (exists) {
        return prev.map((p) =>
          String(p.id) === String(safeId)
            ? { ...p, quantity: (p.quantity || 1) + 1 }
            : p
        );
      }
      return [
        ...prev,
        {
          ...product,
          id: safeId,           // ← gjithmonë slug
          price: safePrice,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId) =>
    setCart((prev) => prev.filter((p) => String(p.id) !== String(productId)));

  const clearCart = () => setCart([]);

  const total = cart.reduce(
    (acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
