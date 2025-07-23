"use client";
import { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext({
  lines: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);

  // Cargar carrito de localStorage al montar
  useEffect(() => {
    const stored = localStorage.getItem("yuma-cart");
    if (stored) setLines(JSON.parse(stored));
  }, []);

  // Guardar carrito en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem("yuma-cart", JSON.stringify(lines));
  }, [lines]);

  const addItem = (item) => {
    setLines((prev) => {
      const exists = prev.find(
        (p) => p.variantId === item.variantId && p.title === item.title
      );
      if (exists) {
        return prev.map((p) =>
          p.variantId === item.variantId && p.title === item.title
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (variantId) => {
    setLines((prev) => prev.filter((item) => item.variantId !== variantId));
  };

  const clearCart = () => {
    setLines([]);
  };

  return (
    <CartContext.Provider value={{ lines, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
