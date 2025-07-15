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

  const addItem = (variantId, quantity) => {
    setLines((prev) => {
      const exists = prev.find((item) => item.variantId === variantId);
      if (exists) {
        return prev.map((item) =>
          item.variantId === variantId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { variantId, quantity }];
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

// Hook para usar más cómodamente
export function useCart() {
  return useContext(CartContext);
}
